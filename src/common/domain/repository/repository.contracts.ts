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
  page: number;
  limit: number;
  sortBy: string | null;
  sortDir: SortDirection | null;
  filter: Filter | null;
};

export class SearchParams<Filter = string> {
  protected _page!: number;
  protected _limit!: number;
  protected _sortBy!: string | null;
  protected _sortDir!: SortDirection | null;
  protected _filter!: Filter | null;

  constructor(props: Partial<SearchProps<Filter>> = {}) {
    this.page = props.page;
    this.limit = props.limit;
    this.sortBy = props.sortBy;
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

  get sortBy(): string | null {
    return this._sortBy;
  }
  private set sortBy(value: string | null | undefined) {
    this._sortBy =
      isEmpty(value) || typeof value === 'object' ? null : toString(value);
  }

  get sortDir(): SortDirection | null {
    return this._sortDir;
  }
  private set sortDir(value: SortDirection | null | undefined) {
    if (!this.sortBy) {
      this._sortDir = null;
      return;
    }
    const dir = toString(value);
    this._sortDir = dir !== 'asc' && dir !== 'desc' ? 'asc' : dir;
  }

  get filter(): Filter | null {
    return this._filter;
  }
  private set filter(value: Filter | null | undefined) {
    this._filter =
      isEmpty(value) || typeof value === 'object'
        ? null
        : (toString(value) as Filter);
  }

  toJSON(): SearchProps<Filter> {
    return {
      page: this.page,
      limit: this.limit,
      sortBy: this.sortBy,
      sortDir: this.sortDir,
      filter: this.filter
    };
  }
}

type SearchResultProps<E, Filter = string> = SearchProps<Filter> & {
  items: E[];
  total: number;
};
export class SearchResult<E extends Entity, Filter = string> {
  readonly items: E[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly lastPage: number;
  readonly sortBy: string | null;
  readonly sortDir: SortDirection | null;
  readonly filter: Filter | null;

  constructor(props: SearchResultProps<E, Filter>) {
    this.items = props.items;
    this.total = props.total;
    this.page = props.page;
    this.limit = props.limit;
    this.lastPage = Math.ceil(this.total / this.limit);
    this.sortBy = props.sortBy;
    this.sortDir = props.sortDir;
    this.filter = props.filter;
  }

  toJSON(): SearchResultProps<E, Filter> & { lastPage: number } {
    return {
      items: this.items,
      total: this.total,
      page: this.page,
      limit: this.limit,
      lastPage: this.lastPage,
      sortBy: this.sortBy,
      sortDir: this.sortDir,
      filter: this.filter
    };
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  Filter = string,
  SearchInput = SearchParams<Filter>,
  SearchOuput = SearchResult<E, Filter>
> extends RepositoryInterface<E> {
  search(query: SearchInput): Promise<SearchOuput>;
}
