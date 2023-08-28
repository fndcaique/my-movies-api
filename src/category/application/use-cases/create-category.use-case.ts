import { Category } from '../../domain/entities/category';
import CategoryRepository from '../../domain/repository/category.repository';

export default class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
    const entity = new Category(input);
    this.categoryRepository.insert(entity);
    return entity.toJSON();
  }
}

export type CreateCategoryInput = {
  name: string;
  description?: string;
  isActive?: boolean;
};

export type CreateCategoryOutput = {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
};
