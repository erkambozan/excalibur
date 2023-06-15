import { CreateHierarchyTypeUseCase } from '@modules/types/domain/usecase/create-hierarchy-type.use-case';
import { HierarchyTypeRepository } from '@modules/types/infrastructure/adapter/hierarchy-type.repository';
import { Test } from '@nestjs/testing';
import { HIERARCHY_TYPE_REPOSITORY } from '@modules/types/types.di-tokens';
import { HierarchyTypeMapper } from '@modules/types/hierarchy-type.mapper';
import { InMemoryHierarchyTypeRepository } from '@modules/types/infrastructure/adapter/in-memory-hierarchy-type.repository';

describe('CreateHierarchyTypeUseCase', () => {
  let createHierarchyTypeUseCase: CreateHierarchyTypeUseCase;
  let hierarchyTypeRepository: HierarchyTypeRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: HIERARCHY_TYPE_REPOSITORY,
          useValue: InMemoryHierarchyTypeRepository,
        },
        CreateHierarchyTypeUseCase,
        HierarchyTypeMapper,
      ],
    }).compile();

    createHierarchyTypeUseCase = module.get<CreateHierarchyTypeUseCase>(
      CreateHierarchyTypeUseCase,
    );

    hierarchyTypeRepository = module.get<HierarchyTypeRepository>(
      HIERARCHY_TYPE_REPOSITORY,
    );
  });

  it('should be defined', () => {
    expect(createHierarchyTypeUseCase).toBeDefined();
  });

  it('should create a hierarchy type', async () => {
    const hierarchyType = await createHierarchyTypeUseCase.execute({
      name: 'hierarchy type name',
    });

    expect(hierarchyType).toBeDefined();
  });
});
