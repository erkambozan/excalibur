import { Mapper } from '@libs/ddd/mapper.interface';
import { RoleResponse } from '@modules/types/domain/commands/dto/role.response';
import { RoleEntity } from '@modules/types/domain/entity/role.entity';
import { RoleModel, roleSchema } from '@modules/types/domain/model/role';
import { RoleProps } from '@modules/types/domain/role';

export class RoleMapper implements Mapper<RoleEntity, RoleModel, RoleResponse> {
  toDomain(record: RoleModel): RoleEntity {
    return new RoleEntity({
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

  toEntity(id: string, props: RoleProps): RoleEntity {
    return new RoleEntity({ id, props });
  }

  toPersistence(entity: RoleEntity): RoleModel {
    const copy = entity.getProps();
    const record: RoleModel = {
      id: copy.id,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      name: copy.name,
      isActive: copy.isActive,
      isDeleted: copy.isDeleted,
    };

    return roleSchema.parse(record);
  }

  toResponse(entity: RoleEntity): RoleResponse {
    return undefined;
  }
}
