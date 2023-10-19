import {
  CategoryModel,
  CategorySequelizeRepository,
} from '@core/category/infra';
import { NotFoundError } from '@core/common/domain/errors/not-found.error';
import { setupSequelize } from '@core/common/infra/db/testing/helpers/sequelize.helper';
import _chance from 'chance';
import { GetCategoryUseCase } from '../../get-category.use-case';

const chance = _chance();

describe('GetCategoryUseCase Integration Tests', () => {
  let useCase: GetCategoryUseCase;
  let repository: CategorySequelizeRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new GetCategoryUseCase(repository);
  });

  it('should throw error when entity not found', async () => {
    await expect(useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new NotFoundError('Entity Not Found using ID fake id'),
    );
  });

  it('should return a category', async () => {
    let model = await CategoryModel.factory().create();
    let output = await useCase.execute({ id: model.id });
    expect(output).toEqual({
      id: model.id,
      name: model.name,
      description: model.description,
      isActive: true,
      createdAt: model.created_at,
    });

    const createdAt = new Date('1998-02-13');
    model = await CategoryModel.factory().create({
      id: chance.guid({ version: 4 }),
      name: 'Test',
      description: 'description',
      is_active: true,
      created_at: createdAt,
    });
    output = await useCase.execute({ id: model.id });
    expect(output).toEqual({
      id: model.id,
      name: model.name,
      description: model.description,
      isActive: true,
      createdAt: createdAt,
    });
  });
});
