import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./create-user-use-case";



class CreateUserController {
  async handle(request: Request, response: Response){
    const { 
      name, 
      email, 
      password } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase) 
    
    await createUserUseCase.execute({
      name,
      email,
      password
    })

    return response.status(201).send()
  }
}

export { CreateUserController }