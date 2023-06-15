import { Inject, Injectable } from '@nestjs/common';
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
  async execute(props: CreateWorkTypeProps): Promise<boolean | null> {
    const workType = WorkTypeEntity.create(props);
    return await this.workTypeRepository.insert(workType);
  }
}
