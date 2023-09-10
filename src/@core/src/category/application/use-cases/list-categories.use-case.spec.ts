import { Category } from '../../domain/entities/category';
import { CategorySearchResult } from '../../domain/repository/category.repository';
import { CategoryInMemoryRepository } from '../../infra/db/in-memory/category-in-memory.repository';
import { ListCategoriesUseCase } from './list-categories.use-case';

describe('ListCategoriesUseCase Unit Tests', () => {
  let useCase: ListCategoriesUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new ListCategoriesUseCase(repository);
  });

  test('toOuput method', () => {
    let result = new CategorySearchResult({
      items: [],
      total: 1,
      page: 1,
      limit: 2,
      sortBy: null,
      sortDir: null,
      filter: null
    });

    let output = useCase['toOuput'](result);
    expect(output).toEqual({
      items: [],
      total: 1,
      page: 1,
      limit: 2,
      lastPage: 1
    });

    const entity = new Category({ name: 'Test' });

    result = new CategorySearchResult({
      items: [entity],
      total: 1,
      page: 1,
      limit: 2,
      sortBy: null,
      sortDir: null,
      filter: null
    });

    output = useCase['toOuput'](result);
    expect(output).toEqual({
      items: [entity.toJSON()],
      total: 1,
      page: 1,
      limit: 2,
      lastPage: 1
    });
  });

  it('should return output with categories ordered by createdAt when use empty input', async () => {
    const createdAt = new Date();
    const items = [
      new Category({ name: 'Test 1', createdAt }),
      new Category({
        name: 'Test 2',
        createdAt: new Date(createdAt.getTime() - 100)
      })
    ];
    repository.items = items;

    const output = await useCase.execute({});

    expect(output).toEqual({
      total: 2,
      page: 1,
      limit: 10,
      lastPage: 1,
      items: [items[1].toJSON(), items[0].toJSON()]
    });
  });

  it('should return output when use page, sortBy and filter', async () => {
    const items = [
      new Category({ name: 'aa' }),
      new Category({ name: 'AAA' }),
      new Category({ name: 'AaA' }),
      new Category({ name: 'bb' })
    ];
    repository.items = items;

    let output = await useCase.execute({
      page: 1,
      limit: 2,
      sortBy: 'name',
      filter: 'a'
    });
    expect(output).toEqual({
      items: [items[1].toJSON(), items[2].toJSON()],
      total: 3,
      page: 1,
      limit: 2,
      lastPage: 2
    });

    output = await useCase.execute({
      page: 2,
      limit: 2,
      sortBy: 'name',
      filter: 'a'
    });
    expect(output).toEqual({
      items: [items[0].toJSON()],
      total: 3,
      page: 2,
      limit: 2,
      lastPage: 2
    });

    output = await useCase.execute({
      page: 1,
      limit: 2,
      filter: 'a',
      sortBy: 'name',
      sortDir: 'desc'
    });
    expect(output).toEqual({
      items: [items[0].toJSON(), items[2].toJSON()],
      total: 3,
      page: 1,
      limit: 2,
      lastPage: 2
    });

    output = await useCase.execute({
      page: 2,
      limit: 2,
      filter: 'a',
      sortBy: 'name',
      sortDir: 'desc'
    });
    expect(output).toEqual({
      items: [items[1].toJSON()],
      total: 3,
      page: 2,
      limit: 2,
      lastPage: 2
    });
  });
});
