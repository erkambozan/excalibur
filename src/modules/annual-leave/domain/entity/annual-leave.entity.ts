import { AggregateRoot } from '@libs/ddd/aggregate-root.base';
import { AggregateID } from '@libs/ddd/entity.base';
import { AnnualLeaveProps, CreateAnnualLeaveProps } from '@modules/annual-leave/domain/annual-leave';

export class AnnualLeaveEntity extends AggregateRoot<AnnualLeaveProps> {
  protected _id: AggregateID;

  static create(create: CreateAnnualLeaveProps): AnnualLeaveEntity {
    const props = { ...create };
    return new AnnualLeaveEntity({ props });
  }
}
