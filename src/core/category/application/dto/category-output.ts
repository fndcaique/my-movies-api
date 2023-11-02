import { Category } from '../../domain/entities/category';

export type CategoryOutput = {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
};

export class CategoryOuputMappper {
  static toOutput(entity: Category): CategoryOutput {
    return entity.toJSON();
  }
}
