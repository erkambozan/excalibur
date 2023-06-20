import { Entity } from '@libs/ddd/entity.base';

export interface Mapper<
  DomainEntity extends Entity<any>,
  DbRecord,
  Response = any,
> {
  toPersistence(entity: DomainEntity): DbRecord;
  toDomain(record: any): DomainEntity;
  toResponse(entity: DomainEntity): Response[] | Response;
  toEntity(id: string, props: any): DomainEntity;
}
