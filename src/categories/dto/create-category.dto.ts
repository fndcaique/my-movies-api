import { CreateCategoryInput } from '../../core/category/application';

export class CreateCategoryDto implements CreateCategoryInput {
  name: string;
  description?: string;
  isActive?: boolean;
}
