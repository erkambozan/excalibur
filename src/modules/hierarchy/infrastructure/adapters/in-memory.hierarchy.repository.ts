import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { HierarchyEntity } from '@modules/hierarchy/domain/entity/hierarchy-entity';
import { HierarchyModel } from '@modules/hierarchy/domain/model/hieararchy';
import { HierarchyRepositoryPort } from '@modules/hierarchy/domain/port/hierarchy.repository.port';
import { ZodObject } from 'zod';
import { QueryResultRow, SqlSqlToken } from 'slonik';
import { baseEntityDataBuilder } from '@libs/data-builders/base-entity.data-builder';
import { hierarchyDataBuilder } from '@modules/hierarchy/data-builder/hierarchy.data-builder';

export class InMemoryHierarchyRepository
  extends SqlRepositoryBase<HierarchyEntity, HierarchyModel>
  implements HierarchyRepositoryPort
{
  protected schema: ZodObject<any>;
  protected tableName: string;
  protected tableStructure: SqlSqlToken<QueryResultRow>;

  baseEntity = baseEntityDataBuilder({ id: '1' });
  hierarchyData = [hierarchyDataBuilder(this.baseEntity)];

  async insert(
    entity: HierarchyEntity[] | HierarchyEntity,
  ): Promise<HierarchyEntity[] | HierarchyEntity> {
    entity = Array.isArray(entity) ? entity : [entity];
    this.hierarchyData.push(entity[0].getProps());
    return entity;
  }

  findByParentPath(path: string): Promise<HierarchyEntity> {
    return Promise.resolve(undefined);
  }

  findMaxRootSubNode(parentPath: string): Promise<number | null> {
    return Promise.resolve(null);
  }

  findMaxRootFirstNode(): Promise<number | null> {
    return Promise.resolve(null);
  }
}
