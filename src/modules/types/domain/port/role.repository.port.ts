import { RepositoryPort } from '@libs/ddd/repository.port';
import { RoleEntity } from '@modules/types/domain/entity/role.entity';

export interface RoleRepositoryPort extends RepositoryPort<RoleEntity> {
  findByName(name: string): Promise<RoleEntity | null>;
}
