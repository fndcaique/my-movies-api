import Entity from '../entity/entity';
import { removeAccents } from '../utils/functions';
import { InMemorySearchableRepository } from './in-memory.repository';
import { SearchParams, SearchResult } from './repository.contracts';

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  protected async applyFilter(
    items: StubEntity[],
    filter: string | null
  ): Promise<StubEntity[]> {
    if (!filter) {
      return items;
    }

    return items.filter(
      (item) =>
        removeAccents(item.props.name.toLowerCase()).includes(
          removeAccents(filter.toLowerCase())
        ) || item.props.price.toString() === filter
    );
  }
}

describe('InMemorySearchableRepository Unit Tests', () => {
  let repository: StubInMemorySearchableRepository;

  beforeEach(() => {
    repository = new StubInMemorySearchableRepository();
  });

  describe('applyFilter method', () => {
    it('should not filter items when filter param is null', async () => {
      const items = [new StubEntity({ name: 'name', price: 5 })];
      const spyFilterMethod = jest.spyOn(items, 'filter');
      const itemsFiltered = await repository['applyFilter'](items, null);
      expect(itemsFiltered).toEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();
    });

    it('should filter using a filter param', async () => {
      const items = [
        new StubEntity({ name: 'name', price: 5 }),
        new StubEntity({ name: 'NAME', price: 5 }),
        new StubEntity({ name: 'fake', price: 0 })
      ];
      const spyFilterMethod = jest.spyOn(items, 'filter');
      let itemsFiltered = await repository['applyFilter'](items, 'NAME');
      expect(itemsFiltered).toEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(1);

      itemsFiltered = await repository['applyFilter'](items, '5');
      expect(itemsFiltered).toEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(2);

      itemsFiltered = await repository['applyFilter'](items, '0');
      expect(itemsFiltered).toEqual([items[2]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(3);
    });
  });
  describe('applySort method', () => {
    it('should not sort items when sortBy param is null or sortBy param is not a key in Entity.props', async () => {
      const items = [
        new StubEntity({ name: 'b', price: 5 }),
        new StubEntity({ name: 'c', price: 3 }),
        new StubEntity({ name: 'a', price: 0 })
      ];
      const spyFilterMethod = jest.spyOn(items, 'sort');
      let itemsSorted = await repository['applySort'](items, null, null);
      expect(itemsSorted).toEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();

      itemsSorted = await repository['applySort'](items, undefined, null);
      expect(itemsSorted).toEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();

      itemsSorted = await repository['applySort'](items, null, undefined);
      expect(itemsSorted).toEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();

      itemsSorted = await repository['applySort'](items, null, 'asc');
      expect(itemsSorted).toEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();

      itemsSorted = await repository['applySort'](items, null, 'desc');
      expect(itemsSorted).toEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();

      itemsSorted = await repository['applySort'](items, null, 'desc');
      expect(itemsSorted).toEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();

      itemsSorted = await repository['applySort'](items, 'xablau', 'desc');
      expect(itemsSorted).toEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();
    });

    it('should sort items without update the items array', async () => {
      const items = [
        new StubEntity({ name: 'b', price: 5 }),
        new StubEntity({ name: 'c', price: 3 }),
        new StubEntity({ name: 'a', price: 0 })
      ];
      const spyFilterMethod = jest.spyOn(items, 'sort');
      let itemsSorted = await repository['applySort'](items, 'name', null);
      expect(itemsSorted).toEqual([items[2], items[0], items[1]]);
      expect(spyFilterMethod).not.toHaveBeenCalled();

      itemsSorted = await repository['applySort'](items, 'name', 'desc');
      expect(itemsSorted).toEqual([items[1], items[0], items[2]]);
      expect(spyFilterMethod).not.toHaveBeenCalled();

      itemsSorted = await repository['applySort'](items, 'price', 'desc');
      expect(itemsSorted).toEqual([...items]);
      expect(spyFilterMethod).not.toHaveBeenCalled();

      itemsSorted = await repository['applySort'](items, 'price', 'asc');
      expect(itemsSorted).toEqual([...items].reverse());
      expect(spyFilterMethod).not.toHaveBeenCalled();
    });
  });
  describe('applyPaginate method', () => {
    it('should paginate items', async () => {
      const items = [
        new StubEntity({ name: 'a', price: 1 }),
        new StubEntity({ name: 'b', price: 5 }),
        new StubEntity({ name: 'c', price: 3 }),
        new StubEntity({ name: 'd', price: 2 }),
        new StubEntity({ name: 'e', price: 4 })
      ];

      let itemsPaginated = await repository['applyPaginate'](items, 1, 2);
      expect(itemsPaginated).toEqual([items[0], items[1]]);

      itemsPaginated = await repository['applyPaginate'](items, 2, 2);
      expect(itemsPaginated).toEqual([items[2], items[3]]);

      itemsPaginated = await repository['applyPaginate'](items, 4, 2);
      expect(itemsPaginated).toEqual([]);
    });
  });
  describe('search method', () => {
    it('should apply only paginate when others params are null', async () => {
      const entity = new StubEntity({ name: 'a', price: 2 });
      const items = Array(11).fill(entity);
      repository.items = items;
      const result = await repository.search(new SearchParams());
      expect(result).toEqual({
        total: 11,
        items: Array(10).fill(entity),
        page: 1,
        limit: 10,
        lastPage: 2,
        sortBy: null,
        sortDir: null,
        filter: null
      });
    });

    it('should apply paginate and filter', async () => {
      const items = [
        new StubEntity({ name: 'test', price: 5 }),
        new StubEntity({ name: 'a', price: 5 }),
        new StubEntity({ name: 'TEST', price: 0 }),
        new StubEntity({ name: 'TeSt', price: 5 }),
        new StubEntity({ name: 'b', price: 0 })
      ];
      repository.items = items;
      let result = await repository.search(
        new SearchParams({ page: 1, limit: 2, filter: 'TEST' })
      );
      expect(result).toEqual({
        total: 3,
        items: [items[0], items[2]],
        page: 1,
        limit: 2,
        lastPage: 2,
        sortBy: null,
        sortDir: null,
        filter: 'TEST'
      });

      result = await repository.search(
        new SearchParams({ page: 2, limit: 2, filter: 'TEST' })
      );
      expect(result).toEqual({
        total: 3,
        items: [items[3]],
        page: 2,
        limit: 2,
        lastPage: 2,
        sortBy: null,
        sortDir: null,
        filter: 'TEST'
      });
    });

    it('should apply paginate and sort', async () => {
      const items = [
        new StubEntity({ name: 'b', price: 1 }),
        new StubEntity({ name: 'a', price: 2 }),
        new StubEntity({ name: 'd', price: 3 }),
        new StubEntity({ name: 'e', price: 4 }),
        new StubEntity({ name: 'c', price: 5 })
      ];
      repository.items = items;

      const arrange = [
        {
          params: new SearchParams({ page: 1, limit: 2, sortBy: 'name' }),
          result: new SearchResult({
            total: 5,
            items: [items[1], items[0]],
            page: 1,
            limit: 2,
            sortBy: 'name',
            sortDir: 'asc',
            filter: null
          })
        },
        {
          params: new SearchParams({ page: 2, limit: 2, sortBy: 'name' }),
          result: new SearchResult({
            total: 5,
            items: [items[4], items[2]],
            page: 2,
            limit: 2,
            sortBy: 'name',
            sortDir: 'asc',
            filter: null
          })
        },
        {
          params: new SearchParams({
            page: 1,
            limit: 2,
            sortBy: 'name',
            sortDir: 'desc'
          }),
          result: new SearchResult({
            total: 5,
            items: [items[3], items[2]],
            page: 1,
            limit: 2,
            sortBy: 'name',
            sortDir: 'desc',
            filter: null
          })
        },
        {
          params: new SearchParams({
            page: 2,
            limit: 2,
            sortBy: 'name',
            sortDir: 'desc'
          }),
          result: new SearchResult({
            total: 5,
            items: [items[4], items[0]],
            page: 2,
            limit: 2,
            sortBy: 'name',
            sortDir: 'desc',
            filter: null
          })
        },
        {
          params: new SearchParams({
            page: 1,
            limit: 3,
            sortBy: 'price',
            sortDir: 'desc'
          }),
          result: new SearchResult({
            total: 5,
            items: [items[4], items[3], items[2]],
            page: 1,
            limit: 3,
            sortBy: 'price',
            sortDir: 'desc',
            filter: null
          })
        }
      ];
      expect.assertions(arrange.length);

      arrange.forEach((item) => {
        expect(repository.search(item.params)).resolves.toEqual(item.result);
      });
    });

    it('should search using filter, sort and paginate', async () => {
      const items = [
        new StubEntity({ name: 'test', price: 1 }),
        new StubEntity({ name: 'a', price: 2 }),
        new StubEntity({ name: 'TEST', price: 1 }),
        new StubEntity({ name: 'e', price: 2 }),
        new StubEntity({ name: 'tEsT', price: 1 })
      ];
      repository.items = items;

      const arrange = [
        {
          params: new SearchParams({
            page: 1,
            limit: 2,
            sortBy: 'name',
            sortDir: 'desc',
            filter: '2'
          }),
          result: new SearchResult({
            total: 2,
            items: [items[3], items[1]],
            page: 1,
            limit: 2,
            sortBy: 'name',
            sortDir: 'desc',
            filter: '2'
          })
        },
        {
          params: new SearchParams({
            page: 1,
            limit: 4,
            sortBy: 'name',
            filter: '1'
          }),
          result: new SearchResult({
            total: 3,
            items: [items[2], items[4], items[0]],
            page: 1,
            limit: 4,
            sortBy: 'name',
            sortDir: 'asc',
            filter: '1'
          })
        },
        {
          params: new SearchParams({
            page: 1,
            limit: 4,
            sortBy: 'price',
            filter: 'e'
          }),
          result: new SearchResult({
            total: 4,
            items: [items[0], items[2], items[4], items[3]],
            page: 1,
            limit: 4,
            sortBy: 'price',
            sortDir: 'asc',
            filter: 'e'
          })
        }
      ];
      expect.assertions(arrange.length);

      arrange.forEach((item) => {
        expect(repository.search(item.params)).resolves.toEqual(item.result);
      });
    });
  });
});
