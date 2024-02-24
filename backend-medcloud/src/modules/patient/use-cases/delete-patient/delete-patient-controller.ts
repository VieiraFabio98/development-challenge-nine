import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePatientUseCase } from "./delete-patient-use-case";

class DeletePatientController{
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id

    const deletePatientUseCase = container.resolve(DeletePatientUseCase)

    const result = await deletePatientUseCase.execute(id)

    return response.status(result.statusCode).json(result)
  }
}

export { DeletePatientController }