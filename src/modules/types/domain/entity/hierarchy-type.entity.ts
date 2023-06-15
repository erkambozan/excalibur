import {
  CreateHierarchyTypeProps,
  HierarchyTypeProps,
} from '@modules/types/domain/hierarchy-type';
import { AggregateID } from '@libs/ddd/entity.base';
import { AggregateRoot } from '@libs/ddd/aggregate-root.base';

export class HierarchyTypeEntity extends AggregateRoot<HierarchyTypeProps> {
  protected readonly _id: AggregateID;

  static create(create: CreateHierarchyTypeProps): HierarchyTypeEntity {
    const props = { ...create };
    return new HierarchyTypeEntity({ props });
  }
}
