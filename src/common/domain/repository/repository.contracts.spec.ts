import {
  SearchParams,
  SearchResult,
  SortDirection
} from './repository.contracts';
describe('Search Unit Tests', () => {
  describe('SearchParams Unit Tests', () => {
    test('page prop', () => {
      const arrange = [
        { page: null, expected: 1 },
        { page: undefined, expected: 1 },
        { page: '', expected: 1 },
        { page: 'fake', expected: 1 },
        { page: -1, expected: 1 },
        { page: 10.1, expected: 10 },
        { page: true, expected: 1 },
        { page: false, expected: 1 },
        { page: {}, expected: 1 },
        { page: [], expected: 1 },
        { page: 0, expected: 1 },
        { page: 1, expected: 1 },
        { page: 2, expected: 2 },
        { page: 300, expected: 300 }
      ];

      arrange.forEach((item) => {
        expect(
          new SearchParams({ page: item.page as unknown as number }).page
        ).toBe(item.expected);
      });
    });
    test('limit prop', () => {
      const arrange = [
        { limit: null, expected: 10 },
        { limit: undefined, expected: 10 },
        { limit: '', expected: 10 },
        { limit: 'fake', expected: 10 },
        { limit: -1, expected: 10 },
        { limit: 12.1, expected: 12 },
        { limit: true, expected: 10 },
        { limit: false, expected: 10 },
        { limit: {}, expected: 10 },
        { limit: [], expected: 10 },
        { limit: 1, expected: 1 },
        { limit: 2, expected: 2 },
        { limit: 300, expected: 300 }
      ];

      arrange.forEach((item) => {
        expect(
          new SearchParams({ limit: item.limit as unknown as number }).limit
        ).toBe(item.expected);
      });
    });

    test('sort prop', () => {
      const arrange = [
        { sort: null, expected: null },
        { sort: undefined, expected: null },
        { sort: '', expected: null },
        { sort: 'fake', expected: 'fake' },
        { sort: -1, expected: '-1' },
        { sort: 10.1, expected: '10.1' },
        { sort: true, expected: 'true' },
        { sort: false, expected: 'false' },
        { sort: {}, expected: null },
        { sort: [], expected: null },
        { sort: 1, expected: '1' },
        { sort: 2, expected: '2' },
        { sort: 300, expected: '300' }
      ];

      arrange.forEach((item) => {
        expect(
          new SearchParams({ sort: item.sort as unknown as string }).sort
        ).toBe(item.expected);
      });
    });

    test('sortDir prop', () => {
      const arrange = [
        { sort: undefined, sortDir: 'desc', expected: null },
        { sort: null, sortDir: 'desc', expected: null },
        { sort: '', sortDir: 'desc', expected: null },
        { sort: 'field', sortDir: null, expected: 'asc' },
        { sort: 'field', sortDir: undefined, expected: 'asc' },
        { sort: 'field', sortDir: '', expected: 'asc' },
        { sort: 'field', sortDir: 'fake', expected: 'asc' },
        { sort: 'field', sortDir: -1, expected: 'asc' },
        { sort: 'field', sortDir: 10.1, expected: 'asc' },
        { sort: 'field', sortDir: true, expected: 'asc' },
        { sort: 'field', sortDir: false, expected: 'asc' },
        { sort: 'field', sortDir: {}, expected: 'asc' },
        { sort: 'field', sortDir: [], expected: 'asc' },
        { sort: 'field', sortDir: 1, expected: 'asc' },
        { sort: 'field', sortDir: 2, expected: 'asc' },
        { sort: 'field', sortDir: 300, expected: 'asc' },
        { sort: 'field', sortDir: 'ascend', expected: 'asc' },
        { sort: 'field', sortDir: 'descend', expected: 'asc' },
        { sort: 'field', sortDir: 'asc', expected: 'asc' },
        { sort: 'field', sortDir: 'desc', expected: 'desc' }
      ];

      arrange.forEach((item) => {
        expect(
          new SearchParams({
            sort: item.sort,
            sortDir: item.sortDir as unknown as SortDirection
          }).sortDir
        ).toBe(item.expected);
      });
    });

    test('filter prop', () => {
      const arrange = [
        { filter: null, expected: null },
        { filter: undefined, expected: null },
        { filter: '', expected: null },
        { filter: {}, expected: null },
        { filter: [], expected: null },
        { filter: 'fake', expected: 'fake' },
        { filter: -1, expected: '-1' },
        { filter: 10.1, expected: '10.1' },
        { filter: true, expected: 'true' },
        { filter: false, expected: 'false' },
        { filter: 1, expected: '1' },
        { filter: 2, expected: '2' },
        { filter: 300, expected: '300' }
      ];

      arrange.forEach((item) => {
        expect(
          new SearchParams({ filter: item.filter as unknown as string }).filter
        ).toBe(item.expected);
      });
    });
  });

  describe('SearchResults Unit Tests', () => {
    test('constructor props', () => {
      let result = new SearchResult({
        items: ['entity1', 'entity2'] as any,
        total: 4,
        page: 1,
        limit: 2,
        sort: null,
        sortDir: null,
        filter: null
      });

      expect(result.toJSON()).toEqual({
        items: ['entity1', 'entity2'] as any,
        total: 4,
        page: 1,
        limit: 2,
        lastPage: 2,
        sort: null,
        sortDir: null,
        filter: null
      });

      result = new SearchResult({
        items: ['entity1', 'entity2'] as any,
        total: 4,
        page: 1,
        limit: 2,
        sort: 'name',
        sortDir: 'asc',
        filter: 'test'
      }) as any;

      expect(result.toJSON()).toEqual({
        items: ['entity1', 'entity2'] as any,
        total: 4,
        page: 1,
        limit: 2,
        lastPage: 2,
        sort: 'name',
        sortDir: 'asc',
        filter: 'test'
      });
    });

    it('should set lastPage 1 when limit is greater than total field', () => {
      const result = new SearchResult({
        items: ['entity1', 'entity2'] as any,
        total: 4,
        page: 1,
        limit: 5,
        sort: null,
        sortDir: null,
        filter: null
      });

      expect(result.toJSON()).toEqual({
        items: ['entity1', 'entity2'] as any,
        total: 4,
        page: 1,
        limit: 5,
        lastPage: 1,
        sort: null,
        sortDir: null,
        filter: null
      });
    });

    test('lastPage prop when total is not a multiple of limit', () => {
      const result = new SearchResult({
        items: ['entity1', 'entity2'] as any,
        total: 15,
        page: 1,
        limit: 2,
        sort: 'name',
        sortDir: 'desc',
        filter: 'test'
      });

      expect(result.toJSON()).toEqual({
        items: ['entity1', 'entity2'] as any,
        total: 15,
        page: 1,
        limit: 2,
        lastPage: 8,
        sort: 'name',
        sortDir: 'desc',
        filter: 'test'
      });
    });
  });
});
