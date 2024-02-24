import auth from "@config/auth";
import { IUserTokensRepository } from "@modules/user/repositories/i-user-token-repository";
import { IDateProvider } from "@shared/container/providers/date-provider/i-date-provider";
import { AppError } from "@shared/errors/app-error";
import { verify, sign } from "jsonwebtoken" 
import { inject, injectable } from "tsyringe";


interface IPayload{
  sub: string;
  email: string;
}

interface ITokenResponse{
  token: string,
  refresh_token: string
}

@injectable()
class RefreshTokenUseCase{

  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider
  ){}

  async execute(token: string): Promise<ITokenResponse>{
    const { email, sub} = verify(token, auth.secret_refresh_token) as IPayload;

    const user_id = sub;

    const userToken = await this.userTokensRepository.findByUserIdAndRefreshToken(user_id, token);

    if(!userToken){
      throw new AppError("RefreshToken does not exists!")
    }

    await this.userTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token
    });

    const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days);

    await this.userTokensRepository.create({
      expires_date,
      refresh_token,
      user_id
    })

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    return {
      refresh_token,
      token: newToken
    };

  }
}

export { RefreshTokenUseCase };