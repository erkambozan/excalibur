import { Mapper } from '@libs/ddd/mapper.interface';
import { HierarchyEntity } from '@modules/hierarchy/domain/entity/hierarchy-entity';
import {
  HierarchyModel,
  hierarchySchema,
} from '@modules/hierarchy/domain/model/hieararchy';
import { HierarchyResponse } from '@modules/hierarchy/domain/commands/dto/hierarchy.response';

export class HierarchyMapper
  implements Mapper<HierarchyEntity, HierarchyModel, HierarchyResponse>
{
  toDomain(record: HierarchyModel): HierarchyEntity {
    const {
      id,
      parentId,
      name,
      type,
      parentPath,
      path,
      createdAt,
      updatedAt,
      isActive,
      isDeleted,
    } = record;

    return new HierarchyEntity({
      id,
      props: {
        parentId,
        name,
        type,
        parentPath,
        path,
      },
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
      isActive,
      isDeleted,
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

  toResponse(
    entity: HierarchyEntity[] | HierarchyEntity,
  ): HierarchyResponse[] | HierarchyResponse {
    if (Array.isArray(entity)) {
      return entity.map((item) => {
        const props = item.getProps();
        const response = new HierarchyResponse(item);
        response.parentId = props.parentId;
        response.name = props.name;
        response.type = props.type;
        response.path = props.path;
        return response;
      });
    }
    return new HierarchyResponse(entity);
  }
}
