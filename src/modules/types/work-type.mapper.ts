import { Mapper } from '@libs/ddd/mapper.interface';
import { WorkTypeEntity } from '@modules/types/domain/entity/work-type.entity';
import { WorkTypeModel } from '@modules/types/domain/model/work-type';
import { WorkTypeResponse } from '@modules/types/domain/commands/dto/work-type.response';
import { WorkTypeProps } from '@modules/types/domain/work-type';

export class WorkTypeMapper
  implements Mapper<WorkTypeEntity, WorkTypeModel, WorkTypeResponse>
{
  toDomain(record: WorkTypeModel): WorkTypeEntity {
    return new WorkTypeEntity({
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

  toEntity(id: string, props: WorkTypeProps): WorkTypeEntity {
    return new WorkTypeEntity({ id, props });
  }

  toPersistence(entity: WorkTypeEntity): WorkTypeModel {
    const copy = entity.getProps();
    return {
      id: copy.id,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      name: copy.name,
      isActive: copy.isActive,
      isDeleted: copy.isDeleted,
    };
  }

  toResponse(entity: WorkTypeEntity): WorkTypeResponse {
    return undefined;
  }
}
