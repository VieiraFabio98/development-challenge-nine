import { ICreateUserDTO } from "@modules/user/dtos/i-create-user-dto";
import { IUsersRepository } from "@modules/user/repositories/i-user-repository";
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { User } from "@modules/user/infra/typeorm/entities/user";
import { ok } from "@shared/helpers";

interface IRequest{
  name?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepository
  ){}

  async execute({
    name,
    email,
    password,
    isAdmin
  }: IRequest): Promise<User>{
    const userExists = await this.userRepository.findByEmail(email)

    if(userExists){
      throw new Error("User already exists.")
    }

    const passwordHash = await hash(password, 8)

    const result = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      isAdmin
    })
    .then(userResult => {
      return userResult
    })
    .catch(error => {
      return error
    })

    return result
  }
}

export { CreateUserUseCase }