import { Mapper } from '@libs/ddd/mapper.interface';
import { PermissionEntity } from '@modules/types/domain/entity/permission.entity';
import {
  PermissionModel,
  permissionSchema,
} from '@modules/types/domain/model/permission';
import { PermissionResponse } from '@modules/types/domain/commands/dto/permission.response';
import { PermissionProps } from '@modules/types/domain/permission';

export class PermissionMapper
  implements Mapper<PermissionEntity, PermissionModel, PermissionResponse>
{
  toDomain(record: PermissionModel): PermissionEntity {
    return new PermissionEntity({
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

  toEntity(id: string, props: PermissionProps): PermissionEntity {
    return new PermissionEntity({ id, props });
  }

  toPersistence(entity: PermissionEntity): PermissionModel {
    const copy = entity.getProps();
    const record: PermissionModel = {
      id: copy.id,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      name: copy.name,
      isActive: copy.isActive,
      isDeleted: copy.isDeleted,
    };

    return permissionSchema.parse(record);
  }

  toResponse(entity: PermissionEntity): PermissionResponse {
    return undefined;
  }
}
