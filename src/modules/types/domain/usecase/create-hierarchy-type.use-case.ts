import { HierarchyTypeRepositoryPort } from '@modules/types/domain/port/hierarchy-type.repository.port';
import { HierarchyTypeEntity } from '@modules/types/domain/entity/hierarchy-type.entity';
import { CreateHierarchyTypeProps } from '@modules/types/domain/hierarchy-type';
import { Inject, Injectable } from '@nestjs/common';
import { HIERARCHY_TYPE_REPOSITORY } from '@modules/types/types.di-tokens';

@Injectable()
export class CreateHierarchyTypeUseCase {
  constructor(
    @Inject(HIERARCHY_TYPE_REPOSITORY)
    private readonly hierarchyTypeRepository: HierarchyTypeRepositoryPort,
  ) {}
  async execute(props: CreateHierarchyTypeProps): Promise<boolean | null> {
    const hierarchyType = HierarchyTypeEntity.create(props);
    return await this.hierarchyTypeRepository.insert(hierarchyType);
  }
}
