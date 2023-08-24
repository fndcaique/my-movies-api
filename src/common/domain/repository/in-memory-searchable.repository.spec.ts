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
  describe('applySort method', () => {});
  describe('applyPaginate method', () => {});
  describe('search method', () => {});
});
