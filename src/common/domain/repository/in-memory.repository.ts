/* eslint-disable @typescript-eslint/no-explicit-any */
import Entity from '../entity/entity';
import NotFoundError from '../errors/not-found.error';
import UniqueEntityId from '../value-objects/unique-entity-id.vo';
import {
  RepositoryInterface,
  SearchParams,
  SearchResult,
  SearchableRepositoryInterface
} from './repository.contracts';

export abstract class InMemoryRepository<E extends Entity>
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
  async findAll(): Promise<E[]> {
    return this.items;
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

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E>
{
  async search(props: SearchParams): Promise<SearchResult<E, string>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter);
    const itemsSorted = await this.applySort(
      itemsFiltered,
      props.sortBy,
      props.sortDir
    );
    const itemsPaginated = await this.applyPaginate(
      itemsSorted,
      props.page,
      props.limit
    );

    return new SearchResult({
      ...props.toJSON(),
      items: itemsPaginated,
      total: itemsFiltered.length
    });
  }

  protected abstract applyFilter(
    items: E[],
    filter: SearchParams['filter']
  ): Promise<E[]>;

  protected async applySort(
    items: E[],
    sortBy?: SearchParams['sortBy'],
    sortDir?: SearchParams['sortDir']
  ): Promise<E[]> {
    if (!items.length || !sortBy || !(sortBy in items[0].props)) {
      return items;
    }
    return [...items].sort((a, b) => {
      if (a.props[sortBy] < b.props[sortBy]) {
        return sortDir === 'desc' ? 1 : -1;
      }
      if (a.props[sortBy] > b.props[sortBy]) {
        return sortDir === 'desc' ? -1 : 1;
      }
      return 0;
    });
  }

  protected async applyPaginate(
    items: E[],
    page: SearchParams['page'],
    limit: SearchParams['limit']
  ): Promise<E[]> {
    const start = (page - 1) * limit;
    const end = start + limit;
    return items.slice(start, end);
  }
}
