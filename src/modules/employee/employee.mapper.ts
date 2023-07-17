import { Mapper } from '@libs/ddd/mapper.interface';
import { EmployeeEntity } from '@modules/employee/domain/entity/employee-entity';
import {
  EmployeeModel,
  employeeSchema,
} from '@modules/employee/domain/model/employee';
import { EmployeeResponse } from '@modules/employee/domain/commands/dto/employee.response';

export class EmployeeMapper
  implements Mapper<EmployeeEntity, EmployeeModel, EmployeeResponse>
{
  toDomain(record: EmployeeModel): EmployeeEntity {
    const {
      id,
      hierarchyId,
      hierarchyPath,
      userId,
      workType,
      createdAt,
      updatedAt,
      isActive,
      isDeleted,
    } = record;

    return new EmployeeEntity({
      id,
      props: {
        hierarchyId,
        hierarchyPath,
        userId,
        workType,
      },
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
      isActive,
      isDeleted,
    });
  }

  toEntity(id: string, props: any): EmployeeEntity {
    return undefined;
  }

  toPersistence(entity: EmployeeEntity): EmployeeModel {
    const copy = entity.getProps();
    const record: EmployeeModel = {
      id: copy.id,
      hierarchyId: copy.hierarchyId,
      hierarchyPath: copy.hierarchyPath,
      userId: copy.userId,
      workType: copy.workType,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      isActive: copy.isActive,
      isDeleted: copy.isDeleted,
    };

    return employeeSchema.parse(record);
  }

  toResponse(
    entity: EmployeeEntity[] | EmployeeEntity,
  ): EmployeeResponse[] | EmployeeResponse {
    if (Array.isArray(entity)) {
      return entity.map((item) => {
        const props = item.getProps();
        const response = new EmployeeResponse(item);
        response.hierarchyId = props.hierarchyId;
        response.hierarchyPath = props.hierarchyPath;
        response.userId = props.userId;
        response.workType = props.workType;
        return response;
      });
    }
    return new EmployeeResponse(entity);
  }
}
