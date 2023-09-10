/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Category,
  CategoryRepository,
  CategorySearchParams,
  CategorySearchResult
} from '#category/domain';
import { NotFoundError, UniqueEntityId } from '#common/domain';
import { CategoryModel } from './category-model';
import { CategoryModelMapper } from './category-model-mapper';

export class CategorySequelizeRepository implements CategoryRepository {
  constructor(private categoryModel: typeof CategoryModel) {}

  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(entity.toJSON());
  }

  async findById(id: string | UniqueEntityId): Promise<Category> {
    const model = await this._get(`${id}`);
    return CategoryModelMapper.toEntity(model);
  }

  async findAll(): Promise<Category[]> {
    const models = await this.categoryModel.findAll();
    return models.map((m) => CategoryModelMapper.toEntity(m));
  }

  update(entity: Category): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(id: string | UniqueEntityId): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private async _get(id: string) {
    const model = await this.categoryModel.findByPk(id, {
      rejectOnEmpty: new NotFoundError(`Entity Not Found using ID ${id}`)
    });
    return model;
  }

  search(query: CategorySearchParams): Promise<CategorySearchResult> {
    throw new Error('Method not implemented.');
  }
}
