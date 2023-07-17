import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { tableName } from '@modules/types/domain/model/permission';
import { ifNotExistCreateTable } from '@modules/types/infrastructure/repository/permission-table.schema';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { Logger } from '@nestjs/common';
import { PermissionEntity } from '@modules/types/domain/entity/permission.entity';
import {
  PermissionModel,
  permissionSchema,
} from '@modules/types/domain/model/permission';
import { PermissionRepositoryPort } from '@modules/types/domain/port/permission.repository.port';
import { PermissionMapper } from '@modules/types/permission.mapper';

export class PermissionRepository
  extends SqlRepositoryBase<PermissionEntity, PermissionModel>
  implements PermissionRepositoryPort
{
  protected tableName = tableName;
  protected schema = permissionSchema;
  protected tableStructure = ifNotExistCreateTable();

  constructor(
    @InjectPool()
    pool: DatabasePool,
    mapper: PermissionMapper,
  ) {
    super(pool, mapper, new Logger(PermissionRepository.name));
  }

  async insert(
    entity: PermissionEntity[] | PermissionEntity,
  ): Promise<PermissionEntity[] | PermissionEntity> {
    return super.insert(entity);
  }

  async findByName(name: string): Promise<PermissionEntity | null> {
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
