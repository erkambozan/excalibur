import { CreateHierarchyUseCase } from '@modules/hierarchy/domain/usecase/create-hierarchy.use-case';
import { Test } from '@nestjs/testing';
import { HIERARCHY_REPOSITORY } from '@modules/hierarchy/hierarchy.di-tokens';
import { hierarchyDataBuilder } from '@modules/hierarchy/data-builder/hierarchy.data-builder';
import { baseEntityDataBuilder } from '@libs/data-builders/base-entity.data-builder';
import { HierarchyMapper } from '@modules/hierarchy/hierarchy.mapper';
import { InMemoryHierarchyRepository } from '@modules/hierarchy/infrastructure/adapters/in-memory.hierarchy.repository';

describe('CreateHierarchyUseCase', () => {
  let hierarchyRepository: InMemoryHierarchyRepository;
  let createHierarchyUseCase: CreateHierarchyUseCase;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: HIERARCHY_REPOSITORY,
          useClass: InMemoryHierarchyRepository,
        },
        CreateHierarchyUseCase,
        HierarchyMapper,
      ],
    }).compile();

    hierarchyRepository =
      module.get<InMemoryHierarchyRepository>(HIERARCHY_REPOSITORY);
    createHierarchyUseCase = module.get<CreateHierarchyUseCase>(
      CreateHierarchyUseCase,
    );
  });

  it('should be defined', () => {
    expect(createHierarchyUseCase).toBeDefined();
  });

  it('should create a hierarchy', async () => {
    const expectedHierarchyData = hierarchyDataBuilder();

    await createHierarchyUseCase.execute(expectedHierarchyData);

    const actualHierarchyData =
      hierarchyRepository.hierarchyData[
        hierarchyRepository.hierarchyData.length - 1
      ];

    expect(actualHierarchyData.name).toStrictEqual(expectedHierarchyData.name);
  });

  it('should create a hierarchy if it is first node ', async () => {
    const expectedHierarchyData = hierarchyDataBuilder();

    await createHierarchyUseCase.execute(expectedHierarchyData);

    const actualHierarchyData =
      hierarchyRepository.hierarchyData[
        hierarchyRepository.hierarchyData.length - 1
      ];

    expect(actualHierarchyData.name).toStrictEqual(expectedHierarchyData.name);
    expect(actualHierarchyData.path).toStrictEqual('1');
  });

  it('should create a hierarchy sub nodes ', async () => {
    const secondNode = hierarchyDataBuilder();
    secondNode.parentPath = '1';

    await createHierarchyUseCase.execute(secondNode);

    const secondNodeActual =
      hierarchyRepository.hierarchyData[
        hierarchyRepository.hierarchyData.length - 1
      ];

    expect(secondNodeActual.name).toStrictEqual(secondNode.name);
    expect(secondNodeActual.path).toStrictEqual('1.1');
  });
});
