import UseCase from '@common/application/use-case';
import CategoryRepository from '../../domain/repository/category.repository';
import { CategoryOuputMappper, CategoryOutput } from '../dto/category-output';

export default class UpdateCategoryUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(input: Input): Promise<Output> {
    const entity = await this.categoryRepository.findById(input.id);
    entity.update(input.name, input.description);
    if (input.isActive === true) {
      entity.activate();
    } else if (input.isActive === false) {
      entity.deactivate();
    }
    await this.categoryRepository.update(entity);
    return CategoryOuputMappper.toOutput(entity);
  }
}

export type Input = {
  id: string;
  name: string;
  description?: string;
  isActive?: boolean;
};

export type Output = CategoryOutput;
