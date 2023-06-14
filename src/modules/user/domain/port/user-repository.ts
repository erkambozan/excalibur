import { RepositoryPort } from '@libs/ddd/repository.port';
import { UserEntity } from '@modules/user/domain/user.entity';

export interface UserRepositoryPort extends RepositoryPort<UserEntity> {
  findOneByEmail(email: string): Promise<UserEntity | null>;
  findOneByUsername(userName: string): Promise<UserEntity | null>;
}
