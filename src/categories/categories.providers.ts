/* eslint-disable @typescript-eslint/no-namespace */
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from '@core/category/application';
import { CategoryRepository } from '@core/category/domain';
import {
  CategoryInMemoryRepository,
  CategoryModel,
  CategorySequelizeRepository,
} from '@core/category/infra';
import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';

const CATEGORY_REPOSITORY_NAME = 'CategoryRepository';

export namespace CATEGORIES_PROVIDERS {
  export namespace REPOSITORIES {
    export const CATEGORY_IN_MEMORY_REPOSITORY: Provider = {
      provide: CATEGORY_REPOSITORY_NAME,
      useClass: CategoryInMemoryRepository,
    };

    export const CATEGORY_SEQUELIZE_REPOSITORY: Provider = {
      provide: 'CategorySequelizeRepository',
      useFactory: (categoryModel: typeof CategoryModel) =>
        new CategorySequelizeRepository(categoryModel),
      inject: [getModelToken(CategoryModel)],
    };
  }

  export namespace USE_CASES {
    export const CREATE_CATEGORY: Provider = {
      provide: CreateCategoryUseCase,
      useFactory: (repository: CategoryRepository) =>
        new CreateCategoryUseCase(repository),
      inject: [CATEGORY_REPOSITORY_NAME],
    };
    export const LIST_CATEGORIES: Provider = {
      provide: ListCategoriesUseCase,
      useFactory: (repository: CategoryRepository) =>
        new ListCategoriesUseCase(repository),
      inject: [CATEGORY_REPOSITORY_NAME],
    };
    export const GET_CATEGORY: Provider = {
      provide: GetCategoryUseCase,
      useFactory: (repository: CategoryRepository) =>
        new GetCategoryUseCase(repository),
      inject: [CATEGORY_REPOSITORY_NAME],
    };
    export const UPDATE_CATEGORY: Provider = {
      provide: UpdateCategoryUseCase,
      useFactory: (repository: CategoryRepository) =>
        new UpdateCategoryUseCase(repository),
      inject: [CATEGORY_REPOSITORY_NAME],
    };
    export const DELETE_CATEGORY: Provider = {
      provide: DeleteCategoryUseCase,
      useFactory: (repository: CategoryRepository) =>
        new DeleteCategoryUseCase(repository),
      inject: [CATEGORY_REPOSITORY_NAME],
    };
  }
}
