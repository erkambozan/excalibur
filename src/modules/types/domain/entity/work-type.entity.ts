import { AggregateID } from '@libs/ddd/entity.base';
import { AggregateRoot } from '@libs/ddd/aggregate-root.base';
import {
  CreateWorkTypeProps,
  WorkTypeProps,
} from '@modules/types/domain/work-type';

export class WorkTypeEntity extends AggregateRoot<WorkTypeProps> {
  protected readonly _id: AggregateID;

  static create(create: CreateWorkTypeProps): WorkTypeEntity {
    const props = { ...create };
    return new WorkTypeEntity({ props });
  }
}
