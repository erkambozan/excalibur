import { InMemoryUserRepository } from '@modules/user/infrastructure/adapter/in-memory-user.repository';
import { CreateUserUseCase } from '@modules/user/domain/usecase/create-user.use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { USER_REPOSITORY } from '@modules/user/user.di-tokens';
import { userEntityDataBuilder } from '@modules/user/data-builders/user.data-builder';
import { UserMapper } from '@modules/user/user.mapper';
import { baseEntityDataBuilder } from '@libs/data-builders/base-entity.data-builder';
import { v4 } from 'uuid';
import { ConflictException } from '@libs/exceptions';
import { UserEntity } from '@modules/user/domain/user.entity';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: InMemoryUserRepository;
  let mapper: UserMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: USER_REPOSITORY,
          useClass: InMemoryUserRepository,
        },
        CreateUserUseCase,
        UserMapper,
      ],
    }).compile();

    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    userRepository = module.get<InMemoryUserRepository>(USER_REPOSITORY);
    mapper = module.get<UserMapper>(UserMapper);
  });

  it('should be defined', () => {
    expect(createUserUseCase).toBeDefined();
  });

  it('should create a user', async () => {
    const baseEntity = baseEntityDataBuilder();
    const userProps = userEntityDataBuilder(baseEntity);
    const newId = v4();
    const expectedUserEntity = mapper.toEntity(newId, userProps);
    const result = await createUserUseCase.execute(userProps);

    if (result instanceof UserEntity) {
      expect(result.getProps()).toStrictEqual(expectedUserEntity.getProps());
    }
  });

  it('should not create exist use', async () => {
    const userProps = userRepository.usersData[0];
    await createUserUseCase.execute(userProps);

    const result = await createUserUseCase.execute(userProps);

    if (result instanceof ConflictException) {
      expect(result).toBe(ConflictException);
    }
  });
});
