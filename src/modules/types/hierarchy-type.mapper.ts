import { Mapper } from '@libs/ddd/mapper.interface';
import { HierarchyTypeEntity } from '@modules/types/domain/entity/hierarchy-type.entity';
import {
  HierarchyTypeModel,
  hierarchyTypeSchema,
} from '@modules/types/domain/model/hierarchy-type';
import { HierarchyTypeResponse } from '@modules/types/domain/commands/dto/hierarchy-type.response';
import { HierarchyTypeProps } from '@modules/types/domain/hierarchy-type';

export class HierarchyTypeMapper
  implements
    Mapper<HierarchyTypeEntity, HierarchyTypeModel, HierarchyTypeResponse>
{
  toDomain(record: HierarchyTypeModel): HierarchyTypeEntity {
    return new HierarchyTypeEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      isActive: record.isActive,
      isDeleted: record.isDeleted,
      props: {
        name: record.name,
      },
    });
  }

  toEntity(id: string, props: HierarchyTypeProps): HierarchyTypeEntity {
    return new HierarchyTypeEntity({ id, props });
  }

  toPersistence(entity: HierarchyTypeEntity): HierarchyTypeModel {
    const copy = entity.getProps();
    const record: HierarchyTypeModel = {
      id: copy.id,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      name: copy.name,
      isActive: copy.isActive,
      isDeleted: copy.isDeleted,
    };

    return hierarchyTypeSchema.parse(record);
  }

  toResponse(entity: HierarchyTypeEntity): HierarchyTypeResponse {
    return undefined;
  }
}
