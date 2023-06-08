import { UserController } from './domain/commands/controller/http-rest/user-controller';
import { UserRepository } from './infrastructure/adapter/user-repository-db';
import { USER_REPOSITORY } from './user.di-tokens';
import { Logger, Module, Provider } from '@nestjs/common';
import { UserMapper } from '@modules/user/user.mapper';
import { CreateUserUseCase } from '@modules/user/domain/usecase/create-user.use-case';

const httpControllers = [UserController];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
  CreateUserUseCase,
];

const mappers: Provider[] = [UserMapper];

@Module({
  imports: [],
  controllers: [...httpControllers],
  providers: [Logger, ...repositories, ...mappers],
})
export class UserModule {}
