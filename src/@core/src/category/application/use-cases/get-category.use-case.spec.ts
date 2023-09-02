import { NotFoundError } from '#common/domain/errors/not-found.error';
import { Category } from '../../domain/entities/category';
import { CategoryInMemoryRepository } from '../../infra/repository/category-in-memory.repository';
import { GetCategoryUseCase } from './get-category.use-case';

describe('GetCategoryUseCase Unit Tests', () => {
  let useCase: GetCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new GetCategoryUseCase(repository);
  });

  it('should throw error when entity not found', () => {
    expect(useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new NotFoundError('Entity Not Found using ID fake id')
    );
  });

  it('should return a category', async () => {
    const items = [new Category({ name: 'Specific category' })];
    repository.items = items;
    const spyFindById = jest.spyOn(repository, 'findById');
    const output = await useCase.execute({ id: items[0].id });
    expect(output).toEqual({
      id: items[0].id,
      name: 'Specific category',
      description: null,
      isActive: true,
      createdAt: items[0].createdAt
    });
    expect(spyFindById).toHaveBeenCalledTimes(1);
  });
});
