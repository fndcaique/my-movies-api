import { UseCase } from '#common/application/use-case';
import { CategoryRepository } from '../../domain/repository/category.repository';

export class DeleteCategoryUseCase
  implements UseCase<DeleteCategoryInput, DeleteCategoryOutput>
{
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(input: DeleteCategoryInput): Promise<DeleteCategoryOutput> {
    await this.categoryRepository.delete(input.id);
  }
}

export type DeleteCategoryInput = {
  id: string;
};

export type DeleteCategoryOutput = void;
