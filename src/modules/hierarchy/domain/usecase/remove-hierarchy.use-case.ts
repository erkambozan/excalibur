import { Inject, Injectable } from '@nestjs/common';
import { HIERARCHY_REPOSITORY } from '@modules/hierarchy/hierarchy.di-tokens';
import { HierarchyRepository } from '@modules/hierarchy/infrastructure/adapters/hierarchy.repository';

@Injectable()
export class RemoveHierarchyUseCase {
  constructor(
    @Inject(HIERARCHY_REPOSITORY)
    private readonly hierarchyRepository: HierarchyRepository,
  ) {}

  async execute(id: number): Promise<void> {
    return await this.hierarchyRepository.removeByNumberId(id);
  }
}
