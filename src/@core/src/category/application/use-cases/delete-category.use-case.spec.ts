import { NotFoundError } from '@common/domain/errors/not-found.error';
import { Category } from '../../domain/entities/category';
import { CategoryInMemoryRepository } from '../../infra/repository/category-in-memory.repository';
import { DeleteCategoryUseCase } from './delete-category.use-case';

describe('DeleteCategoryUseCase Unit Tests', () => {
  let useCase: DeleteCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase(repository);
  });

  it('should throw error when entity not found', () => {
    expect(useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new NotFoundError('Entity Not Found using ID fake id')
    );
  });

  it('should delete a category', async () => {
    const entity = new Category({ name: 'tst' });
    repository.items = [entity];
    const spyDelete = jest.spyOn(repository, 'delete');
    await useCase.execute({ id: entity.id });
    expect(repository.items).toHaveLength(0);
    expect(spyDelete).toHaveBeenCalledTimes(1);
  });
});
