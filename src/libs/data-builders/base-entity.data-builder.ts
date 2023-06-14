import { BaseEntityProps } from '@libs/ddd/entity.base';
import { faker as faker } from '@faker-js/faker';

export const baseEntityDataBuilder = (base = {}): BaseEntityProps => {
  const template: BaseEntityProps = {
    id: faker.string.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
  return Object.assign({}, { ...template, ...base });
};
