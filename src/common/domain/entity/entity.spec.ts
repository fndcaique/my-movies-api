import { isValidUUID } from '../utils/is-valid-uuid';
import UniqueEntityId from '../value-objects/unique-entity-id.vo';
import Entity from './entity';

class StubEntity extends Entity<{ prop1: string; prop2: number }> {}

describe('Entity Unit Tests', () => {
  it('should set props and id', () => {
    const arrange = { prop1: 'value1', prop2: 9 };
    let entity = new StubEntity(arrange);
    expect(entity.props).toEqual(arrange);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBeTruthy();
    expect(isValidUUID(entity.id)).toBe(true);

    const uniqueEntityId = new UniqueEntityId();
    entity = new StubEntity(arrange, uniqueEntityId);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBe(uniqueEntityId.value);
  });

  it('should convert an entity to a JavaScript Object', () => {
    const arrange = { prop1: 'value1', prop2: 9 };
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity(arrange, uniqueEntityId);
    expect(entity.toJSON()).toEqual({ id: uniqueEntityId.value, ...arrange });
  });
});
