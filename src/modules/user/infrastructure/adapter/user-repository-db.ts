import { z, ZodObject } from 'zod';
import { UserRoles } from '../../domain/user-types';
import { Option } from 'oxide.ts';
import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { UserEntity } from '@modules/user/domain/user.entity';
import { UserRepositoryPort } from '@modules/user/domain/port/user-repository';
import { DatabasePool } from 'slonik';
import { UserMapper } from '@modules/user/user.mapper';
import { InjectPool } from 'nestjs-slonik';
import { Logger } from '@nestjs/common';

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: z.nativeEnum(UserRoles),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
});

export type UserModel = z.TypeOf<typeof userSchema>;

export class UserRepository
  extends SqlRepositoryBase<UserEntity, UserModel>
  implements UserRepositoryPort
{
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

  protected schema: ZodObject<any>;
  protected tableName: string;
}
