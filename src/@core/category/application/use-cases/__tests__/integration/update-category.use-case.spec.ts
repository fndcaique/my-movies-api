import { CategoryRepository } from '@core/category/domain';
import {
  CategoryModel,
  CategorySequelizeRepository,
} from '@core/category/infra';
import { NotFoundError } from '@core/common/domain';
import { setupSequelize } from '@core/common/infra/db/testing/helpers/sequelize.helper';
import { UpdateCategoryUseCase } from '../../update-category.use-case';

describe('UpdateCategoryUseCase Unit Tests', () => {
  let useCase: UpdateCategoryUseCase;
  let repository: CategoryRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new UpdateCategoryUseCase(repository);
  });

  it('should throw error when entity not found', async () => {
    await expect(
      useCase.execute({ id: 'fake id', name: 'fake name' }),
    ).rejects.toThrow(new NotFoundError('Entity Not Found using ID fake id'));
  });

  it('should update a category', async () => {
    const model = await CategoryModel.factory().create();
    const arrange = [
      {
        input: { id: model.id, name: 'Test' },
        expected: {
          id: model.id,
          name: 'Test',
          description: null,
          isActive: true,
          createdAt: model.created_at,
        },
      },
      {
        input: {
          id: model.id,
          name: 'Other name',
          description: 'Some description',
        },
        expected: {
          id: model.id,
          name: 'Other name',
          description: 'Some description',
          isActive: true,
          createdAt: model.created_at,
        },
      },
      {
        input: { id: model.id, name: 'Other name', isActive: false },
        expected: {
          id: model.id,
          name: 'Other name',
          description: null,
          isActive: false,
          createdAt: model.created_at,
        },
      },
      {
        input: { id: model.id, name: 'Other name' },
        expected: {
          id: model.id,
          name: 'Other name',
          description: null,
          isActive: false,
          createdAt: model.created_at,
        },
      },
      {
        input: { id: model.id, name: 'name', isActive: true },
        expected: {
          id: model.id,
          name: 'name',
          description: null,
          isActive: true,
          createdAt: model.created_at,
        },
      },
      {
        input: {
          id: model.id,
          name: 'name',
          description: 'description',
        },
        expected: {
          id: model.id,
          name: 'name',
          description: 'description',
          isActive: true,
          createdAt: model.created_at,
        },
      },
    ];
    for (let index = 0; index < arrange.length; index++) {
      const item = arrange[index];
      const output = await useCase.execute(item.input);
      expect(output).toEqual(item.expected);
    }
  });
});
