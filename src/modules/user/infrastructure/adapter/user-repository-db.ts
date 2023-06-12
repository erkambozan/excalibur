import { z } from 'zod';
import { UserRoles } from '../../domain/user-types';
import { Option } from 'oxide.ts';
import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { UserEntity } from '@modules/user/domain/user.entity';
import { UserRepositoryPort } from '@modules/user/domain/port/user-repository';
import { DatabasePool } from 'slonik';
import { UserMapper } from '@modules/user/user.mapper';
import { InjectPool } from 'nestjs-slonik';
import { Injectable, Logger } from '@nestjs/common';
import { ifNotExistCreateTable } from '@modules/user/infrastructure/repository/user-table.schema';

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string(),
  role: z.nativeEnum(UserRoles),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
});

export type UserModel = z.TypeOf<typeof userSchema>;

@Injectable()
export class UserRepository
  extends SqlRepositoryBase<UserEntity, UserModel>
  implements UserRepositoryPort
{
  protected tableName = 'users';
  protected schema = userSchema;

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

  async insert(entity: UserEntity[] | UserEntity): Promise<void> {
    const createTableQuery = await ifNotExistCreateTable();
    return super.insert(entity, createTableQuery);
  }
}
