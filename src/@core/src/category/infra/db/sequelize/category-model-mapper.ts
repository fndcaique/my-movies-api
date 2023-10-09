import { Category } from '#category/domain';
import {
  EntityValidationError,
  LoadEntityError,
  UniqueEntityId,
  toSnakeCase
} from '#common/domain';
import { CategoryModel } from './category-model';

export class CategoryModelMapper {
  static toEntity(model: CategoryModel) {
    const { id, ...otherData } = model.toJSON();
    try {
      return new Category(
        { ...otherData, createdAt: otherData.created_at },
        new UniqueEntityId(id)
      );
    } catch (e) {
      if (e instanceof EntityValidationError) {
        console.error(e);
        throw new LoadEntityError(e.errors);
      }
      throw e;
    }
  }

  static toModel(entity: Category): CategoryModel {
    const model = new CategoryModel({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.isActive,
      created_at: entity.createdAt
    });
    return model;
  }

  static toModelPropName(categoryPropName: string) {
    return toSnakeCase(categoryPropName);
  }
}
