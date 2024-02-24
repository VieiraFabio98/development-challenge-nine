import { IPatientRepository } from "@modules/patient/repositories/i-patient-repository";
import { inject, injectable } from "tsyringe";


@injectable()
class GetPatientUseCase {
  constructor(
    @inject("PatientRepository")
    private patientRepository: IPatientRepository
  ){}

  async execute(id: string){
    const patient = await this.patientRepository.get(id)

    return patient
  }

}

export { GetPatientUseCase }