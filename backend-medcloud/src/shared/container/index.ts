import { PatientRepository } from "@modules/patient/infra/typeorm/repositories/patient-repository";
import { IPatientRepository } from "@modules/patient/repositories/i-patient-repository";
import { UsersRepository } from "@modules/user/infra/typeorm/repositories/user-repository";
import { UsersTokensRepository } from "@modules/user/infra/typeorm/repositories/user-token-repository";
import { IUsersRepository } from "@modules/user/repositories/i-user-repository";
import { IUserTokensRepository } from "@modules/user/repositories/i-user-token-repository";
import { container } from "tsyringe";
import { IDateProvider } from "./providers/date-provider/i-date-provider";
import { DayJsDateProvider } from "./providers/date-provider/implementations/day-js-date-provider";




container.registerSingleton<IPatientRepository>("PatientRepository", PatientRepository)
container.registerSingleton<IUsersRepository>("UserRepository", UsersRepository)
container.registerSingleton<IUserTokensRepository>("UserTokensRepository", UsersTokensRepository)
container.registerSingleton<IDateProvider>("DayJsDateProvider", DayJsDateProvider)