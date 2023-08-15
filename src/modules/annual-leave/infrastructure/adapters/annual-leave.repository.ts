import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { DatabasePool } from 'slonik';
import { InjectPool } from 'nestjs-slonik';
import { Logger } from '@nestjs/common';
import { tableName } from '@modules/employee/domain/model/employee';
import { ifNotExistCreateTable } from '@modules/employee/infrastructure/repository/employee-table.schema';
import {
  AnnualLeaveModel,
  annualLeaveSchema,
} from '@modules/annual-leave/domain/model/annual-leave';
import { AnnualLeaveEntity } from '@modules/annual-leave/domain/entity/annual-leave.entity';
import { AnnualLeaveMapper } from '@modules/annual-leave/annual-leave.mapper';
import { AnnualLeaveRepositoryPort } from '@modules/annual-leave/domain/port/annual-leave.repository.port';

export class AnnualLeaveRepository
  extends SqlRepositoryBase<AnnualLeaveEntity, AnnualLeaveModel>
  implements AnnualLeaveRepositoryPort
{
  protected schema = annualLeaveSchema;
  protected tableName = tableName;
  protected tableStructure = ifNotExistCreateTable();

  constructor(
    @InjectPool()
    pool: DatabasePool,
    mapper: AnnualLeaveMapper,
  ) {
    super(pool, mapper, new Logger(AnnualLeaveRepository.name));
  }

  async insert(
    entity: AnnualLeaveEntity[] | AnnualLeaveEntity,
  ): Promise<AnnualLeaveEntity[] | AnnualLeaveEntity> {
    return await super.insert(entity as AnnualLeaveEntity);
  }

  async findByUserId(
    userId: string,
  ): Promise<AnnualLeaveEntity[] | AnnualLeaveEntity> {
    const data = await super.findOneById(userId);
    return this.mapper.toDomain(data);
  }
}
