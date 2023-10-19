import {
  CategoryModel,
  CategorySequelizeRepository,
} from '@core/category/infra';
import { NotFoundError } from '@core/common/domain/errors/not-found.error';
import { setupSequelize } from '@core/common/infra/db/testing/helpers/sequelize.helper';
import { DeleteCategoryUseCase } from '../../delete-category.use-case';

describe('DeleteCategoryUseCase Integration Tests', () => {
  let useCase: DeleteCategoryUseCase;
  let repository: CategorySequelizeRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new DeleteCategoryUseCase(repository);
  });

  it('should throw error when entity not found', async () => {
    await expect(useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new NotFoundError('Entity Not Found using ID fake id'),
    );
  });

  it('should delete a category', async () => {
    const model = await CategoryModel.factory().create();
    await useCase.execute({ id: model.id });
    expect(await CategoryModel.findAll()).toHaveLength(0);
  });
});
