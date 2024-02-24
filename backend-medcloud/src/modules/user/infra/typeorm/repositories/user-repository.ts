import { User } from "../entities/user";
import { getConnection, getRepository, Repository } from "typeorm";
import { IUsersRepository } from "@modules/user/repositories/i-user-repository";
import { ICreateUserDTO } from "@modules/user/dtos/i-create-user-dto"
import { HttpResponse, ok } from "@shared/helpers";


class UsersRepository implements IUsersRepository{

  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name, 
    email, 
    password,
    isAdmin
  }: ICreateUserDTO): Promise<HttpResponse> {
    const queryRunner = getConnection().createQueryRunner()
    await queryRunner.startTransaction()

    try{
      const user = this.repository.create({
        name, 
        email,
        password,
        isAdmin
      })
  
      const result = await this.repository.manager.save(User, user)
      await queryRunner.commitTransaction()
      return ok(result)
    }catch(err){
      await queryRunner.rollbackTransaction()
      throw err
    }finally{
      await queryRunner.release()
    }
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }
}

export { UsersRepository };