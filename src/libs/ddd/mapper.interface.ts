import { Entity } from '@libs/ddd/entity.base';

export interface Mapper<
  DomainEntity extends Entity<any>,
  DbRecord,
  Response = any,
> {
  toPersistence(entity: DomainEntity): DbRecord;
  toDomain(record: any): DbRecord;
  toResponse(entity: DomainEntity): Response;
}
