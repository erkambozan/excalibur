import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { WorkTypeEntity } from '@modules/types/domain/entity/work-type.entity';
import { WorkTypeModel } from '@modules/types/domain/model/work-type';
import { WorkTypeRepositoryPort } from '@modules/types/domain/port/work-type.repository.port';
import { QueryResultRow, SqlSqlToken } from 'slonik';
import { ZodObject } from 'zod';
import { baseEntityDataBuilder } from '@libs/data-builders/base-entity.data-builder';
import { workTypeDataBuilder } from '@modules/types/data-builders/work-type.data-builder';

export class InMemoryWorkTypeRepository
  extends SqlRepositoryBase<WorkTypeEntity, WorkTypeModel>
  implements WorkTypeRepositoryPort
{
  protected schema: ZodObject<any>;
  protected tableName: string;
  protected tableStructure: SqlSqlToken<QueryResultRow>;

  baseEntity = baseEntityDataBuilder();
  workTypeData = [workTypeDataBuilder(this.baseEntity)];

  async insert(
    entity: WorkTypeEntity[] | WorkTypeEntity,
  ): Promise<WorkTypeEntity> {
    return Promise.resolve(entity as WorkTypeEntity);
  }

  findByName(name: string): Promise<WorkTypeEntity | null> {
    return Promise.resolve(undefined);
  }
}
