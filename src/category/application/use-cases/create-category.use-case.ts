import UseCase from '@common/application/use-case';
import { Category } from '../../domain/entities/category';
import CategoryRepository from '../../domain/repository/category.repository';
import { CategoryOuputMappper, CategoryOutput } from '../dto/category-output';

export default class CreateCategoryUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(input: Input): Promise<Output> {
    const entity = new Category(input);
    this.categoryRepository.insert(entity);
    return CategoryOuputMappper.toOutput(entity);
  }
}

export type Input = {
  name: string;
  description?: string;
  isActive?: boolean;
};

export type Output = CategoryOutput;
