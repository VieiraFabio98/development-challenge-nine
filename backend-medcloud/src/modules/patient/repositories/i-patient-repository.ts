import { HttpResponse } from "@shared/helpers";
import { IPatientDto } from "../dto/i-patient-dto";


interface IPatientRepository {
  create(data: IPatientDto): Promise<HttpResponse>

  get(id: string): Promise<HttpResponse>

  update(data: IPatientDto): Promise<HttpResponse>

  delete(id: string): Promise<HttpResponse>
}

export { IPatientRepository }