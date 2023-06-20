import { Inject, Injectable } from '@nestjs/common';
import { HierarchyRepositoryPort } from '@modules/hierarchy/domain/port/hierarchy.repository.port';
import {
  CreateHierarchyProps,
  HierarchyProps,
} from '@modules/hierarchy/domain/hierarchy';
import { HIERARCHY_REPOSITORY } from '@modules/hierarchy/hierarchy.di-tokens';
import { HierarchyEntity } from '@modules/hierarchy/domain/entity/hierarchy-entity';

@Injectable()
export class CreateHierarchyUseCase {
  constructor(
    @Inject(HIERARCHY_REPOSITORY)
    private readonly hierarchyRepository: HierarchyRepositoryPort,
  ) {}

  async execute(
    props: CreateHierarchyProps,
  ): Promise<HierarchyEntity[] | HierarchyEntity> {
    if (!props.parentPath) {
      props.path = await this.firstPath();
    } else {
      const pathNumber = await this.hierarchyRepository.findMaxRootSubNode(
        props.parentPath,
      );
      props.path = `${props.parentPath}.${pathNumber + 1 ?? 1}`;
    }

    const entity = HierarchyEntity.create(props);
    return await this.hierarchyRepository.insert(entity);
  }

  async firstPath(): Promise<string> {
    const maxRootNodeNumber =
      await this.hierarchyRepository.findMaxRootFirstNode();
    return maxRootNodeNumber === null ? '1' : `${maxRootNodeNumber + 1}`;
  }
}
