import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { HierarchyEntity } from '@modules/hierarchy/domain/entity/hierarchy-entity';
import {
  HierarchyModel,
  hierarchySchema,
  tableName,
} from '@modules/hierarchy/domain/model/hieararchy';
import { HierarchyRepositoryPort } from '@modules/hierarchy/domain/port/hierarchy.repository.port';
import { DatabasePool, sql } from 'slonik';
import { InjectPool } from 'nestjs-slonik';
import { Logger } from '@nestjs/common';
import { HierarchyMapper } from '@modules/hierarchy/hierarchy.mapper';
import { ifNotExistCreateTable } from '@modules/hierarchy/infrastructure/repository/hierarchy-table.schema';

export class HierarchyRepository
  extends SqlRepositoryBase<HierarchyEntity, HierarchyModel>
  implements HierarchyRepositoryPort
{
  protected schema = hierarchySchema;
  protected tableName = tableName;
  protected tableStructure = ifNotExistCreateTable();

  constructor(
    @InjectPool()
    pool: DatabasePool,
    mapper: HierarchyMapper,
  ) {
    super(pool, mapper, new Logger(HierarchyRepository.name));
  }

  async insert(entity: HierarchyEntity[] | HierarchyEntity): Promise<boolean> {
    return await super.insert(entity);
  }

  findByParentPath(path: string): Promise<HierarchyEntity> {
    return Promise.resolve(undefined);
  }

  async findMaxRootSubNode(parentPath: string): Promise<number | null> {
    parentPath = parentPath + '.%' ?? '';
    const query = sql`SELECT SUBSTRING(subpath(path, -1)::text, '^[0-9]+$')::integer
    FROM hierarchy
    WHERE path::text LIKE ${parentPath}
    ORDER BY subpath(path, -1) DESC LIMIT 1
  `;

    const result = await this.pool.maybeOneFirst<number>(query);
    return Promise.resolve(result ?? null);
  }

  async findMaxRootFirstNode(): Promise<number | null> {
    const query = sql`SELECT MAX(SUBSTRING(path::text, '^[0-9]+')) ::integer
                            FROM hierarchy
                          WHERE nlevel(path) = 1`;

    const result = await this.pool.oneFirst<number>(query);

    return Promise.resolve(result ?? null);
  }
}
