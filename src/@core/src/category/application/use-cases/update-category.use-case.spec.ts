import { NotFoundError } from '@common/domain/errors/not-found.error';
import { Category } from '../../domain/entities/category';
import { CategoryInMemoryRepository } from '../../infra/repository/category-in-memory.repository';
import { UpdateCategoryUseCase } from './update-category.use-case';

describe('UpdateCategoryUseCase Unit Tests', () => {
  let useCase: UpdateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new UpdateCategoryUseCase(repository);
  });

  it('should throw error when entity not found', () => {
    expect(
      useCase.execute({ id: 'fake id', name: 'fake name' })
    ).rejects.toThrow(new NotFoundError('Entity Not Found using ID fake id'));
  });

  it('should update a category', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');
    const entity = new Category({ name: 'Category' });
    repository.items = [entity];

    const arrange = [
      {
        input: { id: entity.id, name: 'Test' },
        expected: {
          id: entity.id,
          name: 'Test',
          description: null,
          isActive: true,
          createdAt: entity.createdAt
        }
      },
      {
        input: {
          id: entity.id,
          name: 'Other name',
          description: 'Some description'
        },
        expected: {
          id: entity.id,
          name: 'Other name',
          description: 'Some description',
          isActive: true,
          createdAt: entity.createdAt
        }
      },
      {
        input: { id: entity.id, name: 'Other name', isActive: false },
        expected: {
          id: entity.id,
          name: 'Other name',
          description: null,
          isActive: false,
          createdAt: entity.createdAt
        }
      },
      {
        input: { id: entity.id, name: 'Other name' },
        expected: {
          id: entity.id,
          name: 'Other name',
          description: null,
          isActive: false,
          createdAt: entity.createdAt
        }
      },
      {
        input: { id: entity.id, name: 'name', isActive: true },
        expected: {
          id: entity.id,
          name: 'name',
          description: null,
          isActive: true,
          createdAt: entity.createdAt
        }
      },
      {
        input: {
          id: entity.id,
          name: 'name',
          description: 'description'
        },
        expected: {
          id: entity.id,
          name: 'name',
          description: 'description',
          isActive: true,
          createdAt: entity.createdAt
        }
      }
    ];

    for (let index = 0; index < arrange.length; index++) {
      const item = arrange[index];
      const output = await useCase.execute(item.input);
      expect(output).toEqual(item.expected);
      expect(spyUpdate).toHaveBeenCalledTimes(index + 1);
    }
  });
});
