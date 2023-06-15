import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { baseEntityDataBuilder } from '@libs/data-builders/base-entity.data-builder';
import { HierarchyTypeEntity } from '@modules/types/domain/entity/hierarchy-type.entity';
import { hierarchyDataBuilder } from '@modules/types/data-builders/hierarchy-type.data-builder';
import { HierarchyTypeModel } from '@modules/types/domain/model/hierarchy-type';
import { ZodObject } from 'zod';
import { QueryResultRow, SqlSqlToken } from 'slonik';
import { HierarchyTypeRepositoryPort } from '@modules/types/domain/port/hierarchy-type.repository.port';

export class InMemoryHierarchyTypeRepository
  extends SqlRepositoryBase<HierarchyTypeEntity, HierarchyTypeModel>
  implements HierarchyTypeRepositoryPort
{
  protected schema: ZodObject<any>;
  protected tableName: string;
  protected tableStructure: SqlSqlToken<QueryResultRow>;

  private _baseEntity = baseEntityDataBuilder({ id: '1' });
  private _hierarchyTypeData = [hierarchyDataBuilder(this._baseEntity)];

  async insert(
    entity: HierarchyTypeEntity[] | HierarchyTypeEntity,
  ): Promise<boolean> {
    return Promise.resolve(true);
  }
}
