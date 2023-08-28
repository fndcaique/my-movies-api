import { SortDirection } from '../../domain/repository/repository.contracts';

export type SearchInput<Filter = string> = {
  page?: number;
  limit?: number;
  sortBy?: string | null;
  sortDir?: SortDirection | null;
  filter?: Filter | null;
};
