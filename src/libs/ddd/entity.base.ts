export type AggregateID = any;

export interface BaseEntityProps {
  id: AggregateID;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isDeleted: boolean;
}

export interface CreateEntityProps<T> {
  id?: AggregateID;
  props: T;
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
  isDeleted?: boolean;
}

export abstract class Entity<EntityProps> {
  protected abstract _id: AggregateID;
  private readonly _createdAt: Date;
  private _updatedAt: Date;
  protected readonly isActive: boolean;
  protected readonly isDeleted: boolean;
  protected readonly props: EntityProps;

  constructor({
    id,
    createdAt,
    updatedAt,
    isActive,
    isDeleted,
    props,
  }: CreateEntityProps<EntityProps>) {
    this.setId(id);
    const now = new Date();
    this._createdAt = createdAt || now;
    this._updatedAt = updatedAt || now;
    this.isActive = isActive || true;
    this.isDeleted = isDeleted || false;
    this.props = props;
  }

  get id(): AggregateID {
    return this._id;
  }

  private setId(id: AggregateID): void {
    this._id = id;
  }

  public getProps(): EntityProps & BaseEntityProps {
    const propsCopy = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      isActive: this.isActive,
      isDeleted: this.isDeleted,
      ...this.props,
    };
    return Object.freeze(propsCopy);
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
