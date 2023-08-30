import { SearchResult } from '../../domain/repository/repository.contracts';

export type PaginationOutput<Item = unknown> = {
  total: number;
  page: number;
  lastPage: number;
  limit: number;
  items: Item[];
};

export class PaginationOuputMapper {
  static toOutput(result: SearchResult): Omit<PaginationOutput, 'items'> {
    return {
      total: result.total,
      page: result.page,
      lastPage: result.lastPage,
      limit: result.limit
    };
  }
}
