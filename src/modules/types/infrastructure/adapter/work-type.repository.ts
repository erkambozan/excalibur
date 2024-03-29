import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { WorkTypeRepositoryPort } from '@modules/types/domain/port/work-type.repository.port';
import { WorkTypeEntity } from '@modules/types/domain/entity/work-type.entity';
import {
  tableName,
  WorkTypeModel,
  workTypeSchema,
} from '@modules/types/domain/model/work-type';
import { ifNotExistCreateTable } from '@modules/types/infrastructure/repository/hierarchy-type-table.schema';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool } from 'slonik';
import { Logger } from '@nestjs/common';
import { WorkTypeMapper } from '@modules/types/work-type.mapper';

export class WorkTypeRepository
  extends SqlRepositoryBase<WorkTypeEntity, WorkTypeModel>
  implements WorkTypeRepositoryPort
{
  protected tableName = tableName;
  protected schema = workTypeSchema;
  protected tableStructure = ifNotExistCreateTable();

  constructor(
    @InjectPool()
    pool: DatabasePool,
    mapper: WorkTypeMapper,
  ) {
    super(pool, mapper, new Logger(WorkTypeRepository.name));
  }

  async insert(
    entity: WorkTypeEntity[] | WorkTypeEntity,
  ): Promise<WorkTypeEntity[] | WorkTypeEntity> {
    return super.insert(entity as WorkTypeEntity);
  }

  findByName(name: string): Promise<WorkTypeEntity | null> {
    return Promise.resolve(undefined);
  }
}
