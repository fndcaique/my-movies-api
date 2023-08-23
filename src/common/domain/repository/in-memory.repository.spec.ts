import Entity from '../entity/entity';
import NotFoundError from '../errors/not-found.error';
import { InMemoryRepository } from './in-memory.repository';

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository Unit Tests', () => {
  let repository = new StubInMemoryRepository();

  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });

  it('should insert a new entity', async () => {
    expect.assertions(1);
    const entity = new StubEntity({ name: 'name', price: 0 });
    await repository.insert(entity);
    expect(entity.toJSON()).toEqual(repository.items[0].toJSON());
  });

  it('should throw error when entity not found', () => {
    expect(repository.findById('fake id')).rejects.toThrow(
      new NotFoundError('Entity Not Found using ID fake id')
    );

    expect(
      repository.findById('0a8b9e21-b580-4a17-a88f-3080aa7d5b88')
    ).rejects.toThrow(
      new NotFoundError(
        'Entity Not Found using ID 0a8b9e21-b580-4a17-a88f-3080aa7d5b88'
      )
    );
  });

  it('should find an entity by id', async () => {
    const entity = new StubEntity({ name: 'name', price: 0 });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toEqual(entityFound.toJSON());

    entityFound = await repository.findById(entity.uniqueEntityId);
    expect(entity.toJSON()).toEqual(entityFound.toJSON());
  });

  it('should return the entities saved on repository', async () => {
    const entity = new StubEntity({ name: 'name', price: 0 });
    await repository.insert(entity);

    const entities = await repository.findAll();
    expect(entities).toEqual([entity]);
  });

  it('should throw error on update when entity not found', () => {
    const entity = new StubEntity({ name: 'name', price: 0 });
    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${entity.id}`)
    );
  });

  it('should update an entity', async () => {
    const entity = new StubEntity({ name: 'name', price: 0 });
    await repository.insert(entity);

    const entityUpdated = new StubEntity(
      { name: 'updated', price: 1 },
      entity.uniqueEntityId
    );
    await repository.update(entityUpdated);
    expect(repository.items[0].toJSON()).toEqual(entityUpdated.toJSON());
  });

  it('should throw error on deletee when entity not found', () => {
    expect(repository.delete('fake id')).rejects.toThrow(
      new NotFoundError('Entity Not Found using ID fake id')
    );

    expect(
      repository.delete('0a8b9e21-b580-4a17-a88f-3080aa7d5b88')
    ).rejects.toThrow(
      new NotFoundError(
        'Entity Not Found using ID 0a8b9e21-b580-4a17-a88f-3080aa7d5b88'
      )
    );
  });

  it('should delete an entity', async () => {
    const entity = new StubEntity({ name: 'name', price: 0 });
    await repository.insert(entity);

    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);

    await repository.insert(entity);
    await repository.delete(entity.uniqueEntityId);
    expect(repository.items).toHaveLength(0);
  });
});
