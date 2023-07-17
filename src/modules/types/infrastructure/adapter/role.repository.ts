import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import {
  RoleModel,
  roleSchema,
  tableName,
} from '@modules/types/domain/model/role';
import { ifNotExistCreateTable } from '@modules/types/infrastructure/repository/role-table.schema';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { Logger } from '@nestjs/common';
import { RoleEntity } from '@modules/types/domain/entity/role.entity';
import { RoleMapper } from '@modules/types/role.mapper';
import { RoleRepositoryPort } from '@modules/types/domain/port/role.repository.port';

export class RoleRepository
  extends SqlRepositoryBase<RoleEntity, RoleModel>
  implements RoleRepositoryPort
{
  protected tableName = tableName;
  protected schema = roleSchema;
  protected tableStructure = ifNotExistCreateTable();

  constructor(
    @InjectPool()
    pool: DatabasePool,
    mapper: RoleMapper,
  ) {
    super(pool, mapper, new Logger(RoleRepository.name));
  }

  async insert(
    entity: RoleEntity[] | RoleEntity,
  ): Promise<RoleEntity[] | RoleEntity> {
    return super.insert(entity);
  }

  async findByName(name: string): Promise<RoleEntity | null> {
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
