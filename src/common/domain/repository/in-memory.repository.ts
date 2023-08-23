import Entity from '../entity/entity';
import NotFoundError from '../errors/not-found.error';
import UniqueEntityId from '../value-objects/unique-entity-id.vo';
import { QueryPaginationInterface } from './query-pagination.interface';
import { RepositoryInterface } from './repository.interface';

export default abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }
  async findById(id: string | UniqueEntityId): Promise<E> {
    const _id = `${id}`;
    return this._get(_id);
  }
  async find(query: QueryPaginationInterface): Promise<E[]> {
    return this.items.slice(query.offset).slice(0, query.limit);
  }
  async update(entity: E): Promise<void> {
    await this._get(entity.id);
    const itemIdx = this.items.findIndex((item) => item.id === entity.id);
    if (itemIdx > -1) {
      this.items[itemIdx] = entity;
    }
  }
  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`;
    await this._get(_id);
    const itemIdx = this.items.findIndex((item) => item.id === _id);
    if (itemIdx > -1) {
      this.items.splice(itemIdx, 1);
    }
  }

  protected async _get(id: string): Promise<E> {
    const item = this.items.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundError(`Entity Not Found using ID ${id}`);
    }
    return item;
  }
}
