import { CreateCategoryInput } from '@fnd/core/category/application';

export class CreateCategoryDto implements CreateCategoryInput {
  name: string;
  description?: string;
  isActive?: boolean;
}
