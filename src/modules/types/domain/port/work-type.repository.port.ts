import { RepositoryPort } from '@libs/ddd/repository.port';
import { WorkTypeEntity } from '@modules/types/domain/entity/work-type.entity';

export type WorkTypeRepositoryPort = RepositoryPort<WorkTypeEntity>;
