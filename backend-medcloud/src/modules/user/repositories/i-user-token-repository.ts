import { DeleteQueryBuilder } from "typeorm";
import { ICreateUsersTokensDTO } from "../dtos/i-create-users-tokens-dto";
import { UserTokens } from "../infra/typeorm/entities/user-tokens";


interface IUserTokensRepository{
  create({
    expires_date, 
    refresh_token, 
    user_id
  }: ICreateUsersTokensDTO): Promise<UserTokens>

  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens>;

  deleteById(id: string): Promise<void>;

  findByRefreshToken(refresh_token: string): Promise<UserTokens>
}

export { IUserTokensRepository };