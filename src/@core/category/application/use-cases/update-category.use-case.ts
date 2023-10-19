import { UseCase } from '@core/common/application/use-case';
import { CategoryRepository } from '../../domain/repository/category.repository';
import { CategoryOuputMappper, CategoryOutput } from '../dto/category-output';

export class UpdateCategoryUseCase
  implements UseCase<UpdateCategoryInput, UpdateCategoryOutput>
{
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(input: UpdateCategoryInput): Promise<UpdateCategoryOutput> {
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

export type UpdateCategoryInput = {
  id: string;
  name: string;
  description?: string;
  isActive?: boolean;
};

export type UpdateCategoryOutput = CategoryOutput;
