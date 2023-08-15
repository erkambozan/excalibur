import { Mapper } from '@libs/ddd/mapper.interface';
import { AnnualLeaveEntity } from '@modules/annual-leave/domain/entity/annual-leave.entity';
import {
  AnnualLeaveModel,
  annualLeaveSchema,
} from '@modules/annual-leave/domain/model/annual-leave';
import { AnnualLeaveResponse } from '@modules/annual-leave/domain/commands/dto/annual-leave.response';

export class AnnualLeaveMapper
  implements Mapper<AnnualLeaveEntity, AnnualLeaveModel, AnnualLeaveResponse>
{
  toDomain(record: AnnualLeaveModel): AnnualLeaveEntity {
    const {
      id,
      userId,
      status,
      startDate,
      endDate,
      createdAt,
      updatedAt,
      isActive,
      isDeleted,
    } = record;

    return new AnnualLeaveEntity({
      id,
      props: {
        status,
        startDate,
        endDate,
        userId,
      },
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
      isActive,
      isDeleted,
    });
  }

  toEntity(id: string, props: any): AnnualLeaveEntity {
    return undefined;
  }

  toPersistence(entity: AnnualLeaveEntity): AnnualLeaveModel {
    const copy = entity.getProps();
    const record: AnnualLeaveModel = {
      id: copy.id,
      userId: copy.userId,
      status: copy.status,
      startDate: copy.startDate,
      endDate: copy.endDate,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      isActive: copy.isActive,
      isDeleted: copy.isDeleted,
    };

    return annualLeaveSchema.parse(record);
  }

  toResponse(
    entity: AnnualLeaveEntity[] | AnnualLeaveEntity,
  ): AnnualLeaveResponse[] | AnnualLeaveResponse {
    if (Array.isArray(entity)) {
      return entity.map((item) => {
        const props = item.getProps();
        const response = new AnnualLeaveResponse(item);
        response.status = props.status;
        response.userId = props.userId;
        response.startDate = props.startDate;
        response.endDate = props.endDate;
        return response;
      });
    }
    return new AnnualLeaveResponse(entity);
  }
}
