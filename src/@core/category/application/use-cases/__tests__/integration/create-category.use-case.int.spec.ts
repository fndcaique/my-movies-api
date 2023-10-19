import {
  CategoryModel,
  CategorySequelizeRepository,
} from '@core/category/infra';
import { setupSequelize } from '@core/common/infra/db/testing/helpers/sequelize.helper';
import { CreateCategoryUseCase } from '../../create-category.use-case';

describe('CreateCategoryUseCase Integration Tests', () => {
  let useCase: CreateCategoryUseCase;
  let repository: CategorySequelizeRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new CreateCategoryUseCase(repository);
  });

  it('should create a category', async () => {
    let output = await useCase.execute({ name: 'Test' });
    let entity = await repository.findById(output.id);
    expect(output).toEqual({
      id: entity.id,
      name: 'Test',
      description: null,
      isActive: true,
      createdAt: entity.createdAt,
    });

    output = await useCase.execute({
      name: 'Second',
      description: 'Some description',
      isActive: false,
    });
    entity = await repository.findById(output.id);
    expect(output).toEqual({
      id: entity.id,
      name: 'Second',
      description: 'Some description',
      isActive: false,
      createdAt: entity.createdAt,
    });
  });
});
