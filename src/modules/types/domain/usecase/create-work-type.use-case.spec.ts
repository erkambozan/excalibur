import { Test } from '@nestjs/testing';
import { WORK_TYPE_REPOSITORY } from '@modules/types/types.di-tokens';
import { CreateWorkTypeUseCase } from '@modules/types/domain/usecase/create-work-type.use-case';
import { WorkTypeMapper } from '@modules/types/work-type.mapper';
import { InMemoryWorkTypeRepository } from '@modules/types/infrastructure/adapter/in-memory-work-type.repository';
import { ConflictException } from '@libs/exceptions';
import { workTypeDataBuilder } from '@modules/types/data-builders/work-type.data-builder';
import { WorkTypeEntity } from '@modules/types/domain/entity/work-type.entity';

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
    const workType = workTypeDataBuilder();
    const workEntity = WorkTypeEntity.create(workType);
    const actual = await createWorkTypeUseCase.execute(workType);

    expect(actual).toStrictEqual(workEntity);
  });

  it('should not create a work type with the same name', async () => {
    const workTypeName = 'work type name';
    const workType = await createWorkTypeUseCase.execute({
      name: workTypeName,
    });

    if (workType instanceof ConflictException) {
      expect(workType.message).toBe(ConflictException);
    }
  });
});
