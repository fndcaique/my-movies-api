import Entity from '../entity/entity';
import { removeAccents } from '../utils/functions';
import { InMemorySearchableRepository } from './in-memory.repository';

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
    it('should not sort items when sort param is null', async () => {
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
  describe('applyPaginate method', () => {});
  describe('search method', () => {});
});
