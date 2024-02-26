import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./authenticate-user-use-case";



class AuthenticateUserController {
  async handle(request: Request, response: Response){
    console.log('auqi')
    const { email, password } = request.body

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)
    const token = await authenticateUserUseCase.execute({ email, password })
    console.log(token)
    return response.json(token)
  }
}

export { AuthenticateUserController }