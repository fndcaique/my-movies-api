import { Category } from '@core/category/domain/entities/category';
import { CategoryRepository } from '@core/category/domain/repository/category.repository';
import { UseCase } from '@core/common/application/use-case';
import { CategoryOuputMappper, CategoryOutput } from '../dto/category-output';

export class CreateCategoryUseCase
  implements UseCase<CreateCategoryInput, CreateCategoryOutput>
{
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
    const entity = new Category(input);
    this.categoryRepository.insert(entity);
    return CategoryOuputMappper.toOutput(entity);
  }
}

export type CreateCategoryInput = {
  name: string;
  description?: string;
  isActive?: boolean;
};

export type CreateCategoryOutput = CategoryOutput;
