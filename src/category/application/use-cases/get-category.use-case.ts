import UseCase from '../../../common/application/use-case';
import CategoryRepository from '../../domain/repository/category.repository';
import { CategoryOutput } from '../dto/category-output';

export default class GetCategoryUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(input: Input): Promise<Output> {
    const entity = await this.categoryRepository.findById(input.id);
    return entity.toJSON();
  }
}

export type Input = {
  id: string;
};

export type Output = CategoryOutput;
