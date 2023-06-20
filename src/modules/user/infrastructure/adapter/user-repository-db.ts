import { Option } from 'oxide.ts';
import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { UserEntity } from '@modules/user/domain/user.entity';
import { UserRepositoryPort } from '@modules/user/domain/port/user-repository.port';
import { DatabasePool, sql } from 'slonik';
import { UserMapper } from '@modules/user/user.mapper';
import { InjectPool } from 'nestjs-slonik';
import { Injectable, Logger } from '@nestjs/common';
import { ifNotExistCreateTable } from '@modules/user/infrastructure/repository/user-table.schema';
import {
  tableName,
  UserModel,
  userSchema,
} from '@modules/user/domain/model/user';

@Injectable()
export class UserRepository
  extends SqlRepositoryBase<UserEntity, UserModel>
  implements UserRepositoryPort
{
  protected tableName = tableName;
  protected schema = userSchema;
  protected tableStructure = ifNotExistCreateTable();

  constructor(
    @InjectPool()
    pool: DatabasePool,
    mapper: UserMapper,
  ) {
    super(pool, mapper, new Logger(UserRepository.name));
  }

  findOneByEmail(email: string): Promise<UserEntity | null> {
    return Promise.resolve(undefined);
  }

  findOneById(id: string): Promise<Option<UserEntity>> {
    return Promise.resolve(undefined);
  }

  async insert(
    entity: UserEntity[] | UserEntity,
  ): Promise<UserEntity[] | UserEntity> {
    return super.insert(entity);
  }

  async findOneByUsername(userName: string): Promise<UserEntity> {
    const query = sql`SELECT * FROM ${sql.identifier([
      this.tableName,
    ])} WHERE "userName" = ${userName}`;

    try {
      const userRow = await this.pool.one(query);
      return this.mapper.toDomain(userRow);
    } catch (e) {
      return null;
    }
  }

  findAll(): Promise<any[]> {
    return Promise.resolve([]);
  }
}
