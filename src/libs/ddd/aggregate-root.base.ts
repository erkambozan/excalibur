import { Entity } from '@libs/ddd/entity.base';

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {}
