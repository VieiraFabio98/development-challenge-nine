import { IPatientRepository } from "@modules/patient/repositories/i-patient-repository";
import { HttpResponse } from "@shared/helpers";
import { inject, injectable } from "tsyringe";
import { textChangeRangeIsUnchanged } from "typescript";



@injectable()
class DeletePatientUseCase {
  constructor(
    @inject('PatientRepository')
    private patientRepository: IPatientRepository
  ){}

  async execute(id: string): Promise<HttpResponse> {
    const result = await this.patientRepository.delete(id)

    return result
  }
}

export { DeletePatientUseCase }
