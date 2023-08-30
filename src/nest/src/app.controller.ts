import { Controller, Get } from '@nestjs/common';
import { CategoryInMemoryRepository, ListCategoriesUseCase } from 'core';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    const categoryInMemoryRepository = new CategoryInMemoryRepository();
    const getCategoryUseCase = new ListCategoriesUseCase(
      categoryInMemoryRepository,
    );
    console.log(await getCategoryUseCase.execute({}));
    return this.appService.getHello();
  }
}
