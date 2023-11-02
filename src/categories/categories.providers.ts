/* eslint-disable @typescript-eslint/no-namespace */
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from '../core/category/application';
import { CategoryRepository } from '../core/category/domain';
import { CategoryInMemoryRepository } from '../core/category/infra/db/in-memory/category-in-memory.repository';
import { CategoryModel } from '../core/category/infra/db/sequelize/category-model';
import { CategorySequelizeRepository } from '../core/category/infra/db/sequelize/category-sequelize.repository';

import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';

export namespace CATEGORIES_PROVIDERS {
  export namespace REPOSITORIES {
    export const CATEGORY_IN_MEMORY_REPOSITORY = {
      provide: 'CategoryInMemoryRepository',
      useClass: CategoryInMemoryRepository,
    };

    export const CATEGORY_SEQUELIZE_REPOSITORY = {
      provide: 'CategorySequelizeRepository',
      useFactory: (categoryModel: typeof CategoryModel) =>
        new CategorySequelizeRepository(categoryModel),
      inject: [getModelToken(CategoryModel)],
    };

    export const CATEGORY_REPOSITORY = {
      provide: 'CategoryRepository',
      useExisting: CATEGORY_SEQUELIZE_REPOSITORY.provide,
    };
  }

  export namespace USE_CASES {
    export const CREATE_CATEGORY: Provider = {
      provide: CreateCategoryUseCase,
      useFactory: (repository: CategoryRepository) =>
        new CreateCategoryUseCase(repository),
      inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
    };
    export const LIST_CATEGORIES: Provider = {
      provide: ListCategoriesUseCase,
      useFactory: (repository: CategoryRepository) =>
        new ListCategoriesUseCase(repository),
      inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
    };
    export const GET_CATEGORY: Provider = {
      provide: GetCategoryUseCase,
      useFactory: (repository: CategoryRepository) =>
        new GetCategoryUseCase(repository),
      inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
    };
    export const UPDATE_CATEGORY: Provider = {
      provide: UpdateCategoryUseCase,
      useFactory: (repository: CategoryRepository) =>
        new UpdateCategoryUseCase(repository),
      inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
    };
    export const DELETE_CATEGORY: Provider = {
      provide: DeleteCategoryUseCase,
      useFactory: (repository: CategoryRepository) =>
        new DeleteCategoryUseCase(repository),
      inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
    };
  }
}
