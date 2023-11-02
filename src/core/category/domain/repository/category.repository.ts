import {
  SearchParams,
  SearchResult,
  SearchableRepositoryInterface,
} from '../../../common/domain/repository/repository.contracts';
import { Category, CategoryId } from '../entities/category';

export type CategoryFilter = string;

export class CategorySearchParams extends SearchParams<CategoryFilter> {}

export class CategorySearchResult extends SearchResult<
  Category,
  CategoryFilter
> {}

export interface CategoryRepository
  extends SearchableRepositoryInterface<
    Category,
    CategoryId,
    CategoryFilter,
    CategorySearchParams,
    CategorySearchResult
  > {}
