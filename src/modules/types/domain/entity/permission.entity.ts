import { AggregateID } from '@libs/ddd/entity.base';
import { AggregateRoot } from '@libs/ddd/aggregate-root.base';
import {
  CreatePermissionProps,
  PermissionProps,
} from '@modules/types/domain/permission';

export class PermissionEntity extends AggregateRoot<PermissionProps> {
  protected readonly _id: AggregateID;

  static create(create: CreatePermissionProps): PermissionEntity {
    const props = { ...create };
    return new PermissionEntity({ props });
  }
}
