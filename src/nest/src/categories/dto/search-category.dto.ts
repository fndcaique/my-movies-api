import { ListCategoriesInput } from '@fnd/core/category/application';
import { SortDirection } from '@fnd/core/common/domain';

export class SearchCategoryDto implements ListCategoriesInput {
  page?: number;
  limit?: number;
  sortBy?: string | null;
  sortDir?: SortDirection | null;
  filter?: string | null;
}
