import { UseCase } from '@common/application/use-case';
import { Category } from '../../domain/entities/category';
import { CategoryRepository } from '../../domain/repository/category.repository';
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
