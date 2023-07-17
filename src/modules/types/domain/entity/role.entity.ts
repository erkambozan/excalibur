import { AggregateID } from '@libs/ddd/entity.base';
import { AggregateRoot } from '@libs/ddd/aggregate-root.base';
import { CreateRoleProps } from '@modules/types/domain/role';

export class RoleEntity extends AggregateRoot<CreateRoleProps> {
  protected readonly _id: AggregateID;

  static create(create: CreateRoleProps): RoleEntity {
    const props = { ...create };
    return new RoleEntity({ props });
  }
}
