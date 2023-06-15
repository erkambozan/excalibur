import { RepositoryPort } from '@libs/ddd/repository.port';
import { HierarchyTypeEntity } from '@modules/types/domain/entity/hierarchy-type.entity';

export interface HierarchyTypeRepositoryPort extends RepositoryPort<HierarchyTypeEntity>{}
