import { AggregateID } from '@libs/ddd/entity.base';
import { CreateUserProps, UserProps } from '@modules/user/domain/user-types';
import { v4 } from 'uuid';
import { AggregateRoot } from '@libs/ddd/aggregate-root.base';

export class UserEntity extends AggregateRoot<UserProps> {
  protected readonly _id: AggregateID;

  static create(create: CreateUserProps): UserEntity {
    const id = v4();

    const props: UserProps = { ...create };

    return new UserEntity({ id, props });
  }
}
