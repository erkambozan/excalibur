import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { UserEntity } from '@modules/user/domain/user.entity';
import { UserRepositoryPort } from '@modules/user/domain/port/user-repository.port';
import { ZodObject } from 'zod';
import { QueryResultRow, SqlSqlToken } from 'slonik';
import { userEntityDataBuilder } from '@modules/user/data-builders/user.data-builder';
import { baseEntityDataBuilder } from '@libs/data-builders/base-entity.data-builder';
import { BaseEntityProps } from '@libs/ddd/entity.base';
import { UserProps } from '@modules/user/domain/user-types';
import { UserModel } from '@modules/user/domain/model/user';

export class InMemoryUserRepository
  extends SqlRepositoryBase<UserEntity, UserModel>
  implements UserRepositoryPort
{
  protected schema: ZodObject<any>;
  protected tableName: string;
  protected tableStructure: SqlSqlToken<QueryResultRow>;

  private _baseEntity = baseEntityDataBuilder();
  private _usersData = [userEntityDataBuilder(this._baseEntity)];

  get baseEntity(): BaseEntityProps {
    return this._baseEntity;
  }

  get usersData(): UserProps[] {
    return this._usersData;
  }

  findOneByEmail(email: string): Promise<UserEntity | null> {
    return Promise.resolve(undefined);
  }

  async insert(entity: UserEntity[] | UserEntity): Promise<UserEntity> {
    return Promise.resolve(entity as UserEntity);
  }

  findOneByUsername(userName: string): Promise<UserEntity | null> {
    const result = this._usersData.find((user) => user.userName === userName);
    return result !== undefined
      ? Promise.resolve(UserEntity.create(result))
      : null;
  }

  findAll(): Promise<any[]> {
    return Promise.resolve(this._usersData);
  }
}
