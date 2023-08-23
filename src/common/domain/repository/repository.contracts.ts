import Entity from '../entity/entity';
import { isEmpty, toInteger, toString } from '../utils/functions';
import UniqueEntityId from '../value-objects/unique-entity-id.vo';

export interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<E>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}

export type SortDirection = 'asc' | 'desc';

export type SearchProps<Filter = string> = {
  offset?: number;
  limit?: number;
  sort?: string | null;
  sortDir?: SortDirection | null;
  filter?: Filter | null;
};

export class SearchParams<Filter = string> {
  protected _offset!: number;
  protected _limit!: number;
  protected _sort!: string | null;
  protected _sortDir!: SortDirection | null;
  protected _filter!: Filter | null;

  constructor(props: SearchProps<Filter> = {}) {
    this.offset = props.offset;
    this.limit = props.limit;
    this.sort = props.sort;
    this.sortDir = props.sortDir;
  }

  get offset() {
    return this._offset;
  }
  private set offset(value: number | undefined) {
    let offset = +(value ?? 0);
    if (Number.isNaN(offset) || offset < 0) {
      offset = 0;
    } else if (!Number.isInteger(offset)) {
      offset = toInteger(offset);
    }
    this._offset = offset;
  }

  get limit() {
    return this._limit;
  }
  private set limit(value: number | undefined) {
    let limit = +(value ?? 0);
    if (Number.isNaN(limit) || limit < 0) {
      limit = this._limit;
    } else if (!Number.isInteger(limit)) {
      limit = toInteger(limit);
    }
    this._limit = limit;
  }

  get sort() {
    return this._sort;
  }
  private set sort(value: string | null | undefined) {
    this._sort = isEmpty(value) ? null : toString(value);
  }

  get sortDir() {
    return this._sortDir;
  }
  private set sortDir(value: SortDirection | null | undefined) {
    if (!value) {
      this._sortDir = null;
      return;
    }
    const dir = toString(value);
    this._sortDir = dir !== 'asc' && dir !== 'desc' ? 'asc' : dir;
  }

  get filter() {
    return this._filter;
  }
  private set filter(value: Filter | null) {
    this._filter = isEmpty(value) ? null : value;
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchOuput,
  SearchInput = SearchParams
> extends RepositoryInterface<E> {
  search(query: SearchInput): Promise<SearchOuput>;
}
