import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CATEGORIES_PROVIDERS } from './categories.providers';

@Module({
  controllers: [CategoriesController],
  providers: [
    CATEGORIES_PROVIDERS.REPOSITORY,
    ...Object.values(CATEGORIES_PROVIDERS.USE_CASES),
  ],
})
export class CategoriesModule {}
