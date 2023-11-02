import { CategoryInMemoryRepository } from '../../../../infra/db/in-memory/category-in-memory.repository';
import { CreateCategoryUseCase } from '../../create-category.use-case';

describe('CreateCategoryUseCase Unit Tests', () => {
  let useCase: CreateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase(repository);
  });

  it('should create a category', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');
    let output = await useCase.execute({ name: 'Test' });
    expect(output).toEqual({
      id: repository.items[0].id,
      name: 'Test',
      description: null,
      isActive: true,
      createdAt: repository.items[0].createdAt,
    });
    expect(spyInsert).toHaveBeenCalledTimes(1);

    output = await useCase.execute({
      name: 'Second',
      description: 'Some description',
      isActive: false,
    });
    expect(output).toEqual({
      id: repository.items[1].id,
      name: 'Second',
      description: 'Some description',
      isActive: false,
      createdAt: repository.items[1].createdAt,
    });
    expect(spyInsert).toHaveBeenCalledTimes(2);
  });
});
