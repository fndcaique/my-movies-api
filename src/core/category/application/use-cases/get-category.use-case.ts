import { UseCase } from '../../../common/application/use-case';
import { CategoryRepository } from '../../domain/repository/category.repository';
import { CategoryOuputMappper, CategoryOutput } from '../dto/category-output';

export class GetCategoryUseCase
  implements UseCase<GetCategoryInput, GetCategoryOutput>
{
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(input: GetCategoryInput): Promise<GetCategoryOutput> {
    const entity = await this.categoryRepository.findById(input.id);
    return CategoryOuputMappper.toOutput(entity);
  }
}

export type GetCategoryInput = {
  id: string;
};

export type GetCategoryOutput = CategoryOutput;
