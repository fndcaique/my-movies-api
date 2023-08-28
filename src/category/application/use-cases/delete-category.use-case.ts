import UseCase from '@common/application/use-case';
import CategoryRepository from '../../domain/repository/category.repository';

export default class DeleteCategoryUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(input: Input): Promise<Output> {
    await this.categoryRepository.delete(input.id);
  }
}

export type Input = {
  id: string;
};

export type Output = void;
