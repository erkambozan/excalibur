import { UserRepository } from '@modules/user/infrastructure/adapter/user-repository-db';
import { Test } from '@nestjs/testing';
import { USER_REPOSITORY } from '@modules/user/user.di-tokens';
import { DatabasePool, sql } from 'slonik';
import { getConnectionPool } from '../../../../../test/setup/jestSetupAfterEnv';
import { userEntityDataBuilder } from '@modules/user/data-builders/user.data-builder';
import { baseEntityDataBuilder } from '@libs/data-builders/base-entity.data-builder';
import { UserEntity } from '@modules/user/domain/user.entity';
import { UserMapper } from '@modules/user/user.mapper';
import { RequestContext } from 'nestjs-request-context';

jest.mock('@nestjs/core', () => ({
  ...jest.requireActual('@nestjs/core'),
  RequestContext: {
    getRequestId: jest.fn(() => 'test-request-id'),
  },
}));

const mockRequestContext = { req: { requestId: 'test-request-id' }, res: {} };
jest
  .spyOn(RequestContext, 'currentContext', 'get')
  .mockReturnValue(mockRequestContext);

describe('User Repository Integration Tests', () => {
  let userRepository: UserRepository;
  let pool: DatabasePool;
  beforeAll(async () => {
    pool = getConnectionPool();
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: USER_REPOSITORY,
          useClass: UserRepository,
        },
        {
          provide: 'defaultSlonikPool',
          useValue: pool,
        },
        UserMapper,
      ],
    }).compile();

    userRepository = module.get<UserRepository>(USER_REPOSITORY);
  });

  afterEach(async () => {
    await pool.query(sql`TRUNCATE "users"`);
    await pool.query(sql`TRUNCATE "work_type"`);
    await pool.query(sql`TRUNCATE "hierarchy_type"`);
    await pool.query(sql`TRUNCATE "hierarchy"`);
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  it('should create a user', async () => {
    const baseEntity = baseEntityDataBuilder();
    const userProps = userEntityDataBuilder(baseEntity);
    const userEntity = UserEntity.create(userProps);
    const actual = await userRepository.insert(userEntity);
    expect(actual).toStrictEqual(userEntity);
  });
});
