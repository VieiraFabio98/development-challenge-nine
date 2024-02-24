import { IPatientRepository } from "@modules/patient/repositories/i-patient-repository";
import { Patient } from "../entities/patient";
import { NoConnectionOptionError, QueryRunnerAlreadyReleasedError, Repository, getConnection, getRepository } from "typeorm";
import { IPatientDto } from "@modules/patient/dto/i-patient-dto";
import { HttpResponse, noContent, notFound, ok, serverError } from "@shared/helpers";


class PatientRepository implements IPatientRepository {
  private repository: Repository<Patient>

  constructor() {
    this.repository = getRepository(Patient)
  }

  //create
  async create({
    name,
    birthDate,
    email,
    address
  }: IPatientDto): Promise<HttpResponse> {
    const queryRunner = getConnection().createQueryRunner()
    await queryRunner.startTransaction()

    try {
      const patientExist = await this.repository.findOne({
        where: {
          name: name,
          email: email
        }
      })

      if (patientExist) {
        return null
      }

      const patient = this.repository.create({
        name,
        birthDate,
        email,
        address
      })

      const result = await this.repository.manager.save(Patient, patient)
      await queryRunner.commitTransaction()
      return ok(result)
    } catch (err) {
      await queryRunner.rollbackTransaction()
      throw err
    } finally {
      await queryRunner.release()
    }
  }

  //get
  async get(id: string): Promise<HttpResponse> {
    try{

      const patientExist = await this.repository.findOne(id)

      if(!patientExist){
        return notFound()
      }

      const patient = await this.repository.createQueryBuilder("pat")
      .select([
        'pat.id as "id"',
        'pat.name as "name"',
        'pat.birth_date as "birthDate"',
        'pat.email as "email"',
        'pat.address as "address"'
      ])
      .where('pat.id = :id', { id: id })
      .getRawOne()

    return ok(patient)
    }catch(err){
      return serverError(err)
    }
  }

  //update
  async update({
    id,
    name,
    birthDate,
    email,
    address
  }: IPatientDto): Promise<HttpResponse> {
    const queryRunner = getConnection().createQueryRunner()
    await queryRunner.startTransaction()

    try {
      const patient = await this.repository.findOne(id)

      if (!patient) {
        return notFound()
      }

      const newPatient = await this.repository.create({
        id,
        name,
        birthDate,
        email,
        address
      })

      await this.repository.manager.save(Patient, newPatient)

      return ok(newPatient)
    } catch (err) {
      await queryRunner.rollbackTransaction()
      throw err
    }finally{
      await queryRunner.release()
    }
  }

  async delete(id: string): Promise<HttpResponse> {
    const  queryRunner = getConnection().createQueryRunner()
    await queryRunner.startTransaction()

    try{
      await this.repository.delete(id)

      return noContent()
    }catch(err){
      await queryRunner.rollbackTransaction()
      throw err
    }finally{
      await queryRunner.release()
    }
  }

}

export { PatientRepository }