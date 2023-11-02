import { isValidUUID } from '../utils/is-valid-uuid';
import { UniqueEntityId } from '../value-objects/unique-entity-id.vo';
import { Entity } from './entity';

class StubEntity extends Entity<
  UniqueEntityId,
  { prop1: string; prop2: number },
  { id: string; prop1: string; prop2: number }
> {
  constructor(
    props: { prop1: string; prop2: number },
    entityId?: UniqueEntityId,
  ) {
    super(props, entityId ?? new UniqueEntityId());
  }

  toJSON(): { id: string; prop1: string; prop2: number } {
    return { ...this.props, id: this.id };
  }
}

describe('Entity Unit Tests', () => {
  it('should set props and id', () => {
    const arrange = { prop1: 'value1', prop2: 9 };
    let entity = new StubEntity(arrange);
    expect(entity.props).toEqual(arrange);
    expect(entity.entityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBeTruthy();
    expect(isValidUUID(entity.id)).toBe(true);

    const entityId = new UniqueEntityId();
    entity = new StubEntity(arrange, entityId);
    expect(entity.entityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBe(entityId.value);
  });

  it('should convert an entity to a JavaScript Object', () => {
    const arrange = { prop1: 'value1', prop2: 9 };
    const entityId = new UniqueEntityId();
    const entity = new StubEntity(arrange, entityId);
    expect(entity.toJSON()).toEqual({ id: entityId.value, ...arrange });
  });
});
