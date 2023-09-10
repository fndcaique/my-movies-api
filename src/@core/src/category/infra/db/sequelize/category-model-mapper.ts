import { Category } from '#category/domain';
import {
  EntityValidationError,
  LoadEntityError,
  UniqueEntityId
} from '#common/domain';
import { CategoryModel } from './category-model';

export class CategoryModelMapper {
  static toEntity(model: CategoryModel) {
    const { id, ...otherData } = model.toJSON();
    try {
      return new Category(otherData, new UniqueEntityId(id));
    } catch (e) {
      if (e instanceof EntityValidationError) {
        throw new LoadEntityError(e.errors);
      }
      throw e;
    }
  }
}
