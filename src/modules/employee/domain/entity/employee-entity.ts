import { AggregateRoot } from '@libs/ddd/aggregate-root.base';
import { AggregateID } from '@libs/ddd/entity.base';
import {
  CreateEmployeeProps,
  EmployeeProps,
} from '@modules/employee/domain/employee';

export class EmployeeEntity extends AggregateRoot<EmployeeProps> {
  protected _id: AggregateID;

  static create(create: CreateEmployeeProps): EmployeeEntity {
    const props = { ...create };
    return new EmployeeEntity({ props });
  }
}
