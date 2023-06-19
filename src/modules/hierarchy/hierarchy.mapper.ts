import { Mapper } from '@libs/ddd/mapper.interface';
import { HierarchyEntity } from '@modules/hierarchy/domain/entity/hierarchy-entity';
import {
  HierarchyModel,
  hierarchySchema,
} from '@modules/hierarchy/domain/model/hieararchy';
import { HierarchyResponse } from '@modules/hierarchy/domain/commands/dto/hierarchy.response';
import { HierarchyTypeModel } from '@modules/types/domain/model/hierarchy-type';

export class HierarchyMapper
  implements Mapper<HierarchyEntity, HierarchyModel, HierarchyResponse>
{
  toDomain(record: HierarchyModel): HierarchyEntity {
    return new HierarchyEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      isActive: record.isActive,
      isDeleted: record.isDeleted,
      props: {
        parentId: record.parentId,
        name: record.name,
        type: record.type,
        parentPath: record.parentPath,
        path: record.path,
      },
    });
  }

  toEntity(id: string, props: any): HierarchyEntity {
    return undefined;
  }

  toPersistence(entity: HierarchyEntity): HierarchyModel {
    const copy = entity.getProps();
    const record: HierarchyModel = {
      id: copy.id,
      parentId: copy.parentId,
      name: copy.name,
      type: copy.type,
      parentPath: copy.parentPath,
      path: copy.path,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      isActive: copy.isActive,
      isDeleted: copy.isDeleted,
    };

    return hierarchySchema.parse(record);
  }

  toResponse(entity: HierarchyEntity): HierarchyResponse {
    return undefined;
  }
}
