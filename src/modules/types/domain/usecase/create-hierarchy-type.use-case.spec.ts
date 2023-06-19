import { CreateHierarchyTypeUseCase } from '@modules/types/domain/usecase/create-hierarchy-type.use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { HIERARCHY_TYPE_REPOSITORY } from '@modules/types/types.di-tokens';
import { HierarchyTypeMapper } from '@modules/types/hierarchy-type.mapper';
import { InMemoryHierarchyTypeRepository } from '@modules/types/infrastructure/adapter/in-memory-hierarchy-type.repository';
import { ConflictException } from '@libs/exceptions';

describe('CreateHierarchyTypeUseCase', () => {
  let createHierarchyTypeUseCase: CreateHierarchyTypeUseCase;
  let hierarchyTypeRepository: InMemoryHierarchyTypeRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: HIERARCHY_TYPE_REPOSITORY,
          useClass: InMemoryHierarchyTypeRepository,
        },
        CreateHierarchyTypeUseCase,
        HierarchyTypeMapper,
      ],
    }).compile();

    createHierarchyTypeUseCase = module.get<CreateHierarchyTypeUseCase>(
      CreateHierarchyTypeUseCase,
    );

    hierarchyTypeRepository = module.get<InMemoryHierarchyTypeRepository>(
      HIERARCHY_TYPE_REPOSITORY,
    );
  });

  it('should be defined', () => {
    expect(createHierarchyTypeUseCase).toBeDefined();
  });

  it('should create a hierarchy type', async () => {
    const hierarchyTypeName = 'hierarchy type name';
    const hierarchyType = await createHierarchyTypeUseCase.execute({
      name: hierarchyTypeName,
    });

    const isAdded = hierarchyTypeRepository.hierarchyTypeData.find(
      (ht) => ht.name === hierarchyTypeName,
    );

    expect(hierarchyType).toBe(true);
    expect(isAdded.name).toStrictEqual(hierarchyTypeName);
  });

  it('should not create exist hierarchy type', async () => {
    const hierarchyTypeName = 'hierarchy type name';

    hierarchyTypeRepository.hierarchyTypeData.push(
      (ht) => ht.name === hierarchyTypeName,
    );

    const hierarchyType = await createHierarchyTypeUseCase.execute({
      name: hierarchyTypeName,
    });

    if (hierarchyType instanceof ConflictException) {
      expect(hierarchyType).toBe(ConflictException);
    }
  });
});
