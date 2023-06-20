import { HierarchyTypeRepositoryPort } from '@modules/types/domain/port/hierarchy-type.repository.port';
import { HierarchyTypeEntity } from '@modules/types/domain/entity/hierarchy-type.entity';
import { CreateHierarchyTypeProps } from '@modules/types/domain/hierarchy-type';
import { Inject, Injectable } from '@nestjs/common';
import { HIERARCHY_TYPE_REPOSITORY } from '@modules/types/types.di-tokens';
import { ConflictException } from '@libs/exceptions';

@Injectable()
export class CreateHierarchyTypeUseCase {
  constructor(
    @Inject(HIERARCHY_TYPE_REPOSITORY)
    private readonly hierarchyTypeRepository: HierarchyTypeRepositoryPort,
  ) {}

  async execute(
    props: CreateHierarchyTypeProps,
  ): Promise<HierarchyTypeEntity[] | HierarchyTypeEntity | Error> {
    const hierarchyType = HierarchyTypeEntity.create(props);
    const isExist = await this.hierarchyTypeRepository.findByName(props.name);
    if (isExist) {
      throw new ConflictException(
        `Hierarchy type with name ${props.name} already exists`,
      );
    }
    return await this.hierarchyTypeRepository.insert(hierarchyType);
  }
}
