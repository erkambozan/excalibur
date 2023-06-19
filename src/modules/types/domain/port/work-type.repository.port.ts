import { RepositoryPort } from '@libs/ddd/repository.port';
import { WorkTypeEntity } from '@modules/types/domain/entity/work-type.entity';

export interface WorkTypeRepositoryPort extends RepositoryPort<WorkTypeEntity> {
  findByName(name: string): Promise<WorkTypeEntity | null>;
}
