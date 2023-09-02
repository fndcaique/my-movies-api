import { CreateCategoryInput } from 'core/dist/category/application/use-cases';

export class CreateCategoryDto implements CreateCategoryInput {
  name: string;
  description?: string;
  isActive?: boolean;
}
