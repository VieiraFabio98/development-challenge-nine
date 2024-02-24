import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePatientUseCase } from "./create-patient-use-case";

class CreatePatientController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {
      name,
      birthDate,
      email,
      address
    } = request.body

    const createPatientUseCase = container.resolve(CreatePatientUseCase)

    const result = await createPatientUseCase.execute({
      name,
      birthDate,
      email,
      address
    })
    .then(patientResult => {
      return patientResult
    })
    .catch(error => {
      return error
    })

    return response.status(result.statusCode).json(result)
  }
}

export { CreatePatientController }