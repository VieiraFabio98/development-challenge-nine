import { Patient } from "@modules/patient/infra/typeorm/entities/patient";
import { IPatientRepository } from "@modules/patient/repositories/i-patient-repository";
import { inject, injectable } from "tsyringe";

interface IRequest{
  name: string
  birthDate: Date
  email: string
  address: string
}

@injectable()
class CreatePatientUseCase{
  constructor(
    @inject('PatientRepository')
    private patientRepository: IPatientRepository
  ){}

  async execute({
    name,
    birthDate,
    email,
    address
  }: IRequest): Promise<Patient>{
    const result = await this.patientRepository.create({
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

export { CreatePatientUseCase }  