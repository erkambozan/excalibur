import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { HierarchyTypeEntity } from '@modules/types/domain/entity/hierarchy-type.entity';
import { HierarchyTypeRepositoryPort } from '@modules/types/domain/port/hierarchy-type.repository.port';
import {
  HierarchyTypeModel,
  hierarchyTypeSchema,
  tableName,
} from '@modules/types/domain/model/hierarchy-type';
import { ifNotExistCreateTable } from '@modules/types/infrastructure/repository/hierarchy-type-table.schema';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { Logger } from '@nestjs/common';
import { HierarchyTypeMapper } from '@modules/types/hierarchy-type.mapper';

export class HierarchyTypeRepository
  extends SqlRepositoryBase<HierarchyTypeEntity, HierarchyTypeModel>
  implements HierarchyTypeRepositoryPort
{
  protected tableName = tableName;
  protected schema = hierarchyTypeSchema;
  protected tableStructure = ifNotExistCreateTable();

  constructor(
    @InjectPool()
    pool: DatabasePool,
    mapper: HierarchyTypeMapper,
  ) {
    super(pool, mapper, new Logger(HierarchyTypeRepository.name));
  }

  async insert(
    entity: HierarchyTypeEntity[] | HierarchyTypeEntity,
  ): Promise<boolean> {
    return super.insert(entity);
  }

  async findByName(name: string): Promise<HierarchyTypeEntity | null> {
    const query = sql`SELECT *
                      FROM ${sql.identifier([this.tableName])}
                      WHERE "name" = ${name}`;

    try {
      const row = await this.pool.one(query);
      return this.mapper.toDomain(row);
    } catch (e) {
      return null;
    }
  }
}
