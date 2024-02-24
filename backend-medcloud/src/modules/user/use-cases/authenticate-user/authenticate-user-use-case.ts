import auth from "@config/auth"
import { IUsersRepository } from "@modules/user/repositories/i-user-repository"
import { IUserTokensRepository } from "@modules/user/repositories/i-user-token-repository"
import { AppError } from "@shared/errors/app-error"
import { inject, injectable } from "tsyringe"
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken"
import { IDateProvider } from "@shared/container/providers/date-provider/i-date-provider"


interface IRequest{
  email: string
  password: string
}

interface IResponse{
  user: {
    name: string
    email: string
  },
  token: string
  refresh_token: string
}

@injectable()
class AuthenticateUserUseCase{
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokenRepository: IUserTokensRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider
  ){}


  async execute({email, password }:IRequest): Promise<IResponse>{
    const user = await this.userRepository.findByEmail(email)

    const {
      expires_in_token, 
      secret_token, 
      secret_refresh_token, 
      expires_in_refresh_token,
      expires_refresh_token_days
    } = auth

    if(!user){
      throw new AppError("Email or password incorrect")
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
      throw new AppError("Email or password incorrect") 
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token
    })

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token
    })

    const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days)

    await this.userTokenRepository.create({
      expires_date:refresh_token_expires_date ,
      refresh_token: refresh_token,
      user_id: user.id
    })

    const tokenReturn: IResponse = {
      token,
      user:{
        name: user.name,
        email: user.email
      },
      refresh_token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase }