import { Inject, Injectable } from '@nestjs/common';
import { HierarchyRepository } from '@modules/hierarchy/infrastructure/adapters/hierarchy.repository';
import { HierarchyEntity } from '@modules/hierarchy/domain/entity/hierarchy-entity';
import { HIERARCHY_REPOSITORY } from '@modules/hierarchy/hierarchy.di-tokens';

@Injectable()
export class ListHierarchyUseCase {
  constructor(
    @Inject(HIERARCHY_REPOSITORY)
    private readonly hierarchyRepository: HierarchyRepository,
  ) {}
  async execute(): Promise<HierarchyEntity[]> {
    return await this.hierarchyRepository.findAll();
  }
}
