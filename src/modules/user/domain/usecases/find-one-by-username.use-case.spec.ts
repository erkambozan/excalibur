import { UserRepository } from '@modules/user/infrastructure/adapter/user-repository-db';
import { FindOneByUsernameUseCase } from '@modules/user/domain/usecases/find-one-by-username.use-case';
import { Test } from '@nestjs/testing';
import { USER_REPOSITORY } from '@modules/user/user.di-tokens';
import { InMemoryUserRepository } from '@modules/user/infrastructure/adapter/in-memory-user.repository';

describe('FindOneUserUseCase', () => {
  let findOneByUsernameUseCase: FindOneByUsernameUseCase;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: USER_REPOSITORY,
          useClass: InMemoryUserRepository,
        },
        FindOneByUsernameUseCase,
      ],
    }).compile();

    findOneByUsernameUseCase = module.get<FindOneByUsernameUseCase>(
      FindOneByUsernameUseCase,
    );
    userRepository = module.get<UserRepository>(USER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(findOneByUsernameUseCase).toBeDefined();
  });

  it('should find a user by username', async () => {
    const [user] = await userRepository.findAll();
    const [userActual] = await Promise.all([
      await userRepository.findOneByUsername(user.userName),
    ]);

    expect(userActual.getProps()).toStrictEqual(user);
  });
});
