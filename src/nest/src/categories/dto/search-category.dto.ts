import { ListCategoriesInput } from 'core/dist/category/application/use-cases';
import { SortDirection } from 'core/dist/common/domain/repository/repository.contracts';

export class SearchCategoryDto implements ListCategoriesInput {
  page?: number;
  limit?: number;
  sortBy?: string | null;
  sortDir?: SortDirection | null;
  filter?: string | null;
}
