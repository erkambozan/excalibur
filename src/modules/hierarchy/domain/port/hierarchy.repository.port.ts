import { RepositoryPort } from '@libs/ddd/repository.port';
import { HierarchyEntity } from '@modules/hierarchy/domain/entity/hierarchy-entity';

export interface HierarchyRepositoryPort
  extends RepositoryPort<HierarchyEntity> {
  findByParentPath(path: string): Promise<HierarchyEntity>;
  findMaxRootSubNode(parentPath: string): Promise<number | null>;
  findMaxRootFirstNode(): Promise<number | null>;
}
