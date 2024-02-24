import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetPatientUseCase } from "./get-patient-use-case";


class GetPatientController {
  async handle(request: Request, response: Response): Promise<Response>{
    const  id  = request.params.id

    const getPatientUseCase = container.resolve(GetPatientUseCase)

    const result = await getPatientUseCase.execute(id)

    return response.status(result.statusCode).json(result)
  }
}

export { GetPatientController }