import { HierarchyRepository } from '@modules/hierarchy/infrastructure/adapters/hierarchy.repository';
import { DatabasePool } from 'slonik';
import { HIERARCHY_REPOSITORY } from '@modules/hierarchy/hierarchy.di-tokens';
import { HierarchyMapper } from '@modules/hierarchy/hierarchy.mapper';
import { Test } from '@nestjs/testing';
import { getConnectionPool } from '../../../../../test/setup/jestSetupAfterEnv';
import { hierarchyDataBuilder } from '@modules/hierarchy/data-builder/hierarchy.data-builder';
import { HierarchyEntity } from '@modules/hierarchy/domain/entity/hierarchy-entity';
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
describe('Hierarchy Repository Integration Test', () => {
  let hierarchyRepository: HierarchyRepository;
  let pool: DatabasePool;

  beforeAll(async () => {
    pool = getConnectionPool();
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: HIERARCHY_REPOSITORY,
          useClass: HierarchyRepository,
        },
        {
          provide: 'defaultSlonikPool',
          useValue: pool,
        },
        HierarchyMapper,
      ],
    }).compile();

    hierarchyRepository = module.get<HierarchyRepository>(HIERARCHY_REPOSITORY);
  });

  it('should be defined', () => {
    expect(hierarchyRepository).toBeDefined();
  });

  it('should create a hierarchy', async () => {
    const hierarchyData = hierarchyDataBuilder();
    const hierarchy = HierarchyEntity.create(hierarchyData);
    const actualHierarchyData = await hierarchyRepository.insert(hierarchy);

    expect(actualHierarchyData).toStrictEqual(hierarchy);
  });
});
