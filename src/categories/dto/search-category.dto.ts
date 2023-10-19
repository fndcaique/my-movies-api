import { ListCategoriesInput } from '@core/category/application';
import { SortDirection } from '@core/common/domain';

export class SearchCategoryDto implements ListCategoriesInput {
  page?: number;
  limit?: number;
  sortBy?: string | null;
  sortDir?: SortDirection | null;
  filter?: string | null;
}
