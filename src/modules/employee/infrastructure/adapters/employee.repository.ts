import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { DatabasePool } from 'slonik';
import { InjectPool } from 'nestjs-slonik';
import { Logger } from '@nestjs/common';
import { EmployeeEntity } from '@modules/employee/domain/entity/employee-entity';
import { EmployeeRepositoryPort } from '@modules/employee/domain/port/employee.repository.port';
import {
  EmployeeModel,
  employeeSchema,
  tableName,
} from '@modules/employee/domain/model/employee';
import { EmployeeMapper } from '@modules/employee/employee.mapper';
import { ifNotExistCreateTable } from '@modules/employee/infrastructure/repository/employee-table.schema';

export class EmployeeRepository
  extends SqlRepositoryBase<EmployeeEntity, EmployeeModel>
  implements EmployeeRepositoryPort
{
  protected schema = employeeSchema;
  protected tableName = tableName;
  protected tableStructure = ifNotExistCreateTable();

  constructor(
    @InjectPool()
    pool: DatabasePool,
    mapper: EmployeeMapper,
  ) {
    super(pool, mapper, new Logger(EmployeeRepository.name));
  }

  async insert(
    entity: EmployeeEntity[] | EmployeeEntity,
  ): Promise<EmployeeEntity[] | EmployeeEntity> {
    return await super.insert(entity as EmployeeEntity);
  }

  findByUserId(userId: string): Promise<EmployeeEntity[] | EmployeeEntity> {
    return Promise.resolve(undefined);
  }
}
