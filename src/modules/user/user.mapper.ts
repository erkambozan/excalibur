import { Mapper } from '@libs/ddd/mapper.interface';
import { UserEntity } from '@modules/user/domain/user.entity';
import { UserResponse } from '@modules/user/domain/commands/dto/user-response';
import { UserProps } from '@modules/user/domain/user-types';
import { UserModel, userSchema } from '@modules/user/domain/model/user';

export class UserMapper
  implements Mapper<UserEntity, UserModel, UserResponse>
{
  toPersistence(entity: UserEntity): UserModel {
    const copy = entity.getProps();
    const record: UserModel = {
      id: copy.id,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      email: copy.email,
      userName: copy.userName,
      firstName: copy.firstName,
      lastName: copy.lastName,
      password: copy.password,
      phone: copy.email,
      role: copy.role,
    };
    return userSchema.parse(record);
  }

  toDomain(record: UserModel): UserEntity {
    const entity = new UserEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        email: record.email,
        userName: record.userName,
        firstName: record.firstName,
        lastName: record.lastName,
        password: record.password,
        phone: record.phone,
        role: record.role,
      },
    });
    return entity;
  }

  toResponse(entity: UserEntity | UserEntity[]): UserResponse | UserResponse[] {
    if (Array.isArray(entity)) {
      return entity.map((item) => {
        const props = item.getProps();
        const response = new UserResponse(item);
        response.email = props.email;
        response.firstName = props.firstName;
        response.lastName = props.lastName;
        response.userName = props.userName;
        return response;
      });
    }
    const props = entity.getProps();
    const response = new UserResponse(entity);
    response.email = props.email;
    return response;
  }

  toEntity(id: string, props: UserProps): UserEntity {
    return new UserEntity({ id, props });
  }
}
