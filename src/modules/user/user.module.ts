import { UserController } from './domain/commands/controller/http-rest/user.controller';
import { UserRepository } from '@modules/user/infrastructure/adapter/user-repository-db';
import { Logger, Module, Provider } from '@nestjs/common';
import { UserMapper } from '@modules/user/user.mapper';
import { CreateUserUseCase } from '@modules/user/domain/usecase/create-user.use-case';
import { USER_REPOSITORY } from '@modules/user/user.di-tokens';
import { FindAllUserUseCase } from '@modules/user/domain/usecase/find-all-user.use-case';

const httpControllers = [UserController];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
  CreateUserUseCase,
  FindAllUserUseCase,
];

const mappers: Provider[] = [UserMapper];

@Module({
  imports: [],
  controllers: [...httpControllers],
  providers: [Logger, ...repositories, ...mappers],
})
export class UserModule {}
