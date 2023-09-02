import { Category } from '../../domain/entities/category';
import { CategorySearchParams } from '../../domain/repository/category.repository';
import { CategoryInMemoryRepository } from './category-in-memory.repository';

describe('CategoryInMemoryRepository Unit Tests', () => {
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
  });
  it('should sort categories by createdAt property when the param sortBy is not passed', async () => {
    const categoryA = new Category({
      name: 'Category A',
      createdAt: new Date(2023, 7, 26)
    });
    await repository.insert(categoryA);
    const categoryB = new Category({
      name: 'Category B',
      createdAt: new Date(2023, 7, 25)
    });
    await repository.insert(categoryB);

    const result = await repository.search(new CategorySearchParams());

    expect(result.items).toEqual([categoryB, categoryA]);
  });

  it('should filter category by name', async () => {
    const categoryA = new Category({
      name: 'Test A',
      description: 'd1'
    });
    await repository.insert(categoryA);
    const categoryB = new Category({
      name: 'Test B',
      description: 'd2'
    });
    await repository.insert(categoryB);

    const arranges = [
      { filter: 'd1', items: [] },
      { filter: 'd2', items: [] },
      { filter: 'a', items: [categoryA] },
      { filter: 'b', items: [categoryB] }
    ];

    arranges.forEach(async (item) => {
      const result = await repository.search(
        new CategorySearchParams({ filter: item.filter })
      );

      expect(result.items).toEqual(item.items);
    });
  });
});
