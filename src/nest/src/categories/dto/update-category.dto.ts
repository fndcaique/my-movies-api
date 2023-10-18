import { UpdateCategoryInput } from '@fnd/core/category/application';

export class UpdateCategoryDto implements Omit<UpdateCategoryInput, 'id'> {
  name: string;
  description?: string;
  isActive?: boolean;
}
