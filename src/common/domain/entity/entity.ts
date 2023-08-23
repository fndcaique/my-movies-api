import UniqueEntityId from '../value-objects/unique-entity-id.vo';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default abstract class Entity<Props = any> {
  public readonly uniqueEntityId: UniqueEntityId;
  constructor(
    public readonly props: Props,
    id?: UniqueEntityId
  ) {
    this.uniqueEntityId = id || new UniqueEntityId();
  }

  get id(): string {
    return this.uniqueEntityId.value;
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props
    };
  }
}
