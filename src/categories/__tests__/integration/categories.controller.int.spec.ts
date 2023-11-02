import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from '../../../core/category/application/use-cases';

import { CategoryRepository } from '../../../core/category/domain';
import { CATEGORIES_PROVIDERS } from '../../categories.providers';
import { ConfigModule } from './../../../config/config.module';
import { DatabaseModule } from './../../../database/database.module';
import { CategoriesController } from './../../categories.controller';
import { CategoriesModule } from './../../categories.module';
describe('CategoriesController Integration Tests', () => {
  let controller: CategoriesController;
  let repository: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule, CategoriesModule],
    }).compile();

    controller = module.get(CategoriesController);
    repository = module.get(
      CATEGORIES_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller['createUseCase']).toBeInstanceOf(CreateCategoryUseCase);
    expect(controller['updateUseCase']).toBeInstanceOf(UpdateCategoryUseCase);
    expect(controller['getUseCase']).toBeInstanceOf(GetCategoryUseCase);
    expect(controller['listUseCase']).toBeInstanceOf(ListCategoriesUseCase);
    expect(controller['deleteUseCase']).toBeInstanceOf(DeleteCategoryUseCase);
  });

  it('should create a category', async () => {
    const output = await controller.create({ name: 'Test' });
    const entity = await repository.findById(output.id);
    expect(output.id).toBe(entity.id);
    expect(output.name).toBe('Test');
    expect(output.description).toBeNull();
    expect(output.isActive).toBe(true);
    expect(output.createdAt).toEqual(entity.createdAt);
  });
});
