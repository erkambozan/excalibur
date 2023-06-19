import { Test } from '@nestjs/testing';
import { WORK_TYPE_REPOSITORY } from '@modules/types/types.di-tokens';
import { CreateWorkTypeUseCase } from '@modules/types/domain/usecase/create-work-type.use-case';
import { WorkTypeMapper } from '@modules/types/work-type.mapper';
import { InMemoryWorkTypeRepository } from '@modules/types/infrastructure/adapter/in-memory-work-type.repository';
import { ConflictException } from '@libs/exceptions';

describe('CreateWorkTypeUseCase', () => {
  let workTypeRepository: InMemoryWorkTypeRepository;
  let createWorkTypeUseCase: CreateWorkTypeUseCase;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: WORK_TYPE_REPOSITORY,
          useClass: InMemoryWorkTypeRepository,
        },
        CreateWorkTypeUseCase,
        WorkTypeMapper,
      ],
    }).compile();

    createWorkTypeUseCase = module.get<CreateWorkTypeUseCase>(
      CreateWorkTypeUseCase,
    );
    workTypeRepository =
      module.get<InMemoryWorkTypeRepository>(WORK_TYPE_REPOSITORY);
  });

  it('should be defined', () => {
    expect(createWorkTypeUseCase).toBeDefined();
  });

  it('should create a work type', async () => {
    const workTypeName = 'work type name';
    const workType = await createWorkTypeUseCase.execute({
      name: workTypeName,
    });

    const isAdded = workTypeRepository.workTypeData.find(
      (wt) => wt.name === workTypeName,
    );

    expect(workType).toBe(true);
    expect(isAdded.name).toStrictEqual(workTypeName);
  });

  it('should not create a work type with the same name', async () => {
    const workTypeName = 'work type name';
    workTypeRepository.workTypeData.push({ name: workTypeName });
    const workType = await createWorkTypeUseCase.execute({
      name: workTypeName,
    });

    if (workType instanceof ConflictException) {
      expect(workType.message).toBe(ConflictException);
    }
  });
});
