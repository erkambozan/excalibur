import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { WORK_TYPE_REPOSITORY } from '@modules/types/types.di-tokens';
import { WorkTypeEntity } from '@modules/types/domain/entity/work-type.entity';
import { WorkTypeRepositoryPort } from '@modules/types/domain/port/work-type.repository.port';
import { CreateWorkTypeProps } from '@modules/types/domain/work-type';

@Injectable()
export class CreateWorkTypeUseCase {
  constructor(
    @Inject(WORK_TYPE_REPOSITORY)
    private readonly workTypeRepository: WorkTypeRepositoryPort,
  ) {}
  async execute(
    props: CreateWorkTypeProps,
  ): Promise<WorkTypeEntity[] | WorkTypeEntity | Error> {
    const workType = WorkTypeEntity.create(props);
    const isExist = await this.workTypeRepository.findByName(props.name);
    if (isExist) {
      throw new ConflictException('Work type already exists');
    }

    return await this.workTypeRepository.insert(workType);
  }
}
