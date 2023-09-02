/* eslint-disable @typescript-eslint/no-namespace */
import { Provider } from '@nestjs/common';
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from 'core/dist/category/application/use-cases';
import { CategoryRepository } from 'core/dist/category/domain/repository/category.repository';
import { CategoryInMemoryRepository } from 'core/dist/category/infra/repository';

const CATEGORY_REPOSITORY_NAME = 'CategoryRepository';

export namespace CATEGORIES_PROVIDERS {
  export const REPOSITORY: Provider = {
    provide: CATEGORY_REPOSITORY_NAME,
    useClass: CategoryInMemoryRepository,
  };

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
