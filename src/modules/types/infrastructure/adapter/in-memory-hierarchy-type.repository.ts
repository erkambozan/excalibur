import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { baseEntityDataBuilder } from '@libs/data-builders/base-entity.data-builder';
import { HierarchyTypeEntity } from '@modules/types/domain/entity/hierarchy-type.entity';
import { hierarchyDataBuilder } from '@modules/types/data-builders/hierarchy-type.data-builder';
import { HierarchyTypeModel } from '@modules/types/domain/model/hierarchy-type';
import { ZodObject } from 'zod';
import { QueryResultRow, SqlSqlToken } from 'slonik';
import { HierarchyTypeRepositoryPort } from '@modules/types/domain/port/hierarchy-type.repository.port';
import { HierarchyTypeProps } from '@modules/types/domain/hierarchy-type';

export class InMemoryHierarchyTypeRepository
  extends SqlRepositoryBase<HierarchyTypeEntity, HierarchyTypeModel>
  implements HierarchyTypeRepositoryPort
{
  get hierarchyTypeData(): HierarchyTypeProps[] {
    return this._hierarchyTypeData;
  }
  protected schema: ZodObject<any>;
  protected tableName: string;
  protected tableStructure: SqlSqlToken<QueryResultRow>;

  private _baseEntity = baseEntityDataBuilder({ id: '1' });
  private _hierarchyTypeData = [hierarchyDataBuilder(this._baseEntity)];

  async insert(
    entity: HierarchyTypeEntity[] | HierarchyTypeEntity,
  ): Promise<boolean> {
    entity = Array.isArray(entity) ? entity : [entity];
    this._hierarchyTypeData.push(entity[0].getProps());
    return Promise.resolve(true);
  }

  findByName(name: string): Promise<HierarchyTypeEntity | null> {
    return Promise.resolve(undefined);
  }
}
