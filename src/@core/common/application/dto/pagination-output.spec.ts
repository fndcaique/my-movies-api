import { SearchResult } from '../../domain/repository/repository.contracts';
import { PaginationOuputMapper } from './pagination-output';

describe('PaginationOuputMapper Unit Tests', () => {
  it('should convert a search result to output', () => {
    const result = new SearchResult({
      items: ['test' as any],
      total: 1,
      page: 1,
      limit: 1,
      sortBy: 'name',
      sortDir: 'desc',
      filter: 'desc',
    });

    const output = PaginationOuputMapper.toOutput(result);

    expect(output).toEqual({
      total: 1,
      page: 1,
      limit: 1,
      lastPage: 1,
    });
  });
});
