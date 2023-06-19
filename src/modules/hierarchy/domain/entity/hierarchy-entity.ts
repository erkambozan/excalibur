import { AggregateRoot } from '@libs/ddd/aggregate-root.base';
import { AggregateID } from '@libs/ddd/entity.base';
import {
  CreateHierarchyProps,
  HierarchyProps,
} from '@modules/hierarchy/domain/hierarchy';

export class HierarchyEntity extends AggregateRoot<HierarchyProps> {
  protected _id: AggregateID;

  static create(create: CreateHierarchyProps): HierarchyEntity {
    const props = { ...create };
    return new HierarchyEntity({ props });
  }
}
