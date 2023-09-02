import { UpdateCategoryInput } from 'core/dist/category/application/use-cases';

export class UpdateCategoryDto implements Omit<UpdateCategoryInput, 'id'> {
  name: string;
  description?: string;
  isActive?: boolean;
}
