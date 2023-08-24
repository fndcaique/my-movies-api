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
  page?: number;
  limit?: number;
  sort?: string | null;
  sortDir?: SortDirection | null;
  filter?: Filter | null;
};

export class SearchParams {
  protected _page!: number;
  protected _limit!: number;
  protected _sort!: string | null;
  protected _sortDir!: SortDirection | null;
  protected _filter!: string | null;

  constructor(props: SearchProps = {}) {
    this.page = props.page;
    this.limit = props.limit;
    this.sort = props.sort;
    this.sortDir = props.sortDir;
    this.filter = props.filter;
  }

  get page(): number {
    return this._page;
  }
  private set page(value: number | undefined) {
    let page = +`${value}`;
    if (Number.isNaN(page) || page <= 0) {
      page = 1;
    } else if (!Number.isInteger(page)) {
      page = toInteger(page);
    }
    this._page = page;
  }

  get limit(): number {
    return this._limit;
  }
  private set limit(value: number | undefined) {
    let limit =
      typeof value === 'number' ? value : isEmpty(value) ? 10 : +`${value}`;
    if (Number.isNaN(limit) || limit < 0) {
      limit = this._limit || 10;
    } else if (!Number.isInteger(limit)) {
      limit = toInteger(limit);
    }
    this._limit = limit;
  }

  get sort(): string | null {
    return this._sort;
  }
  private set sort(value: string | null | undefined) {
    this._sort =
      isEmpty(value) || typeof value === 'object' ? null : toString(value);
  }

  get sortDir(): SortDirection | null {
    return this._sortDir;
  }
  private set sortDir(value: SortDirection | null | undefined) {
    if (!this.sort) {
      this._sortDir = null;
      return;
    }
    const dir = toString(value);
    this._sortDir = dir !== 'asc' && dir !== 'desc' ? 'asc' : dir;
  }

  get filter(): string | null {
    return this._filter;
  }
  private set filter(value: string | null | undefined) {
    this._filter =
      isEmpty(value) || typeof value === 'object' ? null : toString(value);
  }

  toJSON() {
    return {
      page: this.page,
      limit: this.limit,
      sort: this.sort,
      sortDir: this.sortDir,
      filter: this.filter
    };
  }
}

type SearchResultProps<E, Filter> = {
  items: E[];
  total: number;
  page: number;
  limit: number;
  sort: string | null;
  sortDir: string | null;
  filter: Filter | null;
};
export class SearchResult<E extends Entity, Filter = string> {
  readonly items: E[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly lastPage: number;
  readonly sort: string | null;
  readonly sortDir: string | null;
  readonly filter: Filter | null;

  constructor(props: SearchResultProps<E, Filter>) {
    this.items = props.items;
    this.total = props.total;
    this.page = props.page;
    this.limit = props.limit;
    this.lastPage = Math.ceil(this.total / this.limit);
    this.sort = props.sort;
    this.sortDir = props.sortDir;
    this.filter = props.filter;
  }

  toJSON() {
    return {
      items: this.items,
      total: this.total,
      page: this.page,
      limit: this.limit,
      lastPage: this.lastPage,
      sort: this.sort,
      sortDir: this.sortDir,
      filter: this.filter
    };
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  Filter = string,
  SearchInput = SearchParams,
  SearchOuput = SearchResult<E, Filter>
> extends RepositoryInterface<E> {
  search(query: SearchInput): Promise<SearchOuput>;
}
