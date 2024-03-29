import { faker as faker } from '@faker-js/faker';
import { UserProps, UserRoles } from '@modules/user/domain/user-types';

export const userEntityDataBuilder = (baseEntity = {}): UserProps => {
  return {
    ...baseEntity,
    email: faker.internet.email(),
    userName: faker.internet.userName(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    password: faker.internet.password(),
    phone: faker.phone.number('999-999-9999'),
    role: faker.helpers.arrayElement(Object.values(UserRoles)),
  };
};
