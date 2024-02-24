import { Request, Response } from "express";
import { UpdatePatientUseCase } from "./update-patient-use-case";
import { container } from "tsyringe";



class UpdatePatientController {
  async handle(request: Request, response: Response){
    const id = request.params.id
    const { 
      name, 
      birthDate, 
      email, 
      address 
    } = request.body

    const updatePatientUseCase = container.resolve(UpdatePatientUseCase)

    const result = await updatePatientUseCase.execute({
      id, 
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

export { UpdatePatientController }