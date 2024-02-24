import { HttpResponse } from "@shared/helpers";
import { ICreateUserDTO } from "../dtos/i-create-user-dto";
import { User } from "../infra/typeorm/entities/user";

interface IUsersRepository{
  create(data: ICreateUserDTO): Promise<HttpResponse>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };