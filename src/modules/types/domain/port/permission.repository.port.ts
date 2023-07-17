import { RepositoryPort } from '@libs/ddd/repository.port';
import { PermissionEntity } from '@modules/types/domain/entity/permission.entity';

export interface PermissionRepositoryPort
  extends RepositoryPort<PermissionEntity> {
  findByName(name: string): Promise<PermissionEntity | null>;
}
