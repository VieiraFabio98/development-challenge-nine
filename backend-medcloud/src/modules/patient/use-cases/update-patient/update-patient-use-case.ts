import { IPatientRepository } from "@modules/patient/repositories/i-patient-repository";
import { inject, injectable } from "tsyringe";


interface IRequest{
  id: string
  name: string
  birthDate: Date
  email: string
  address: string
}

@injectable()
class UpdatePatientUseCase{
  constructor(
    @inject('PatientRepository')
    private patientRepository: IPatientRepository
  ){}

  async execute({
    id,
    name,
    birthDate,
    email,
    address
  }: IRequest): Promise<void>{
    const result = await this.patientRepository.update({
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

    return result

  }
}
export { UpdatePatientUseCase }