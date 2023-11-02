/* eslint-disable @typescript-eslint/no-unused-vars */
import { Op } from 'sequelize';
import {
  Category,
  CategoryId,
  CategoryRepository,
  CategorySearchParams,
  CategorySearchResult,
} from '../../../../category/domain';
import { NotFoundError } from '../../../../common/domain';
import { CategoryModel } from './category-model';
import { CategoryModelMapper } from './category-model-mapper';

export class CategorySequelizeRepository implements CategoryRepository {
  constructor(private categoryModel: typeof CategoryModel) {}

  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(
      CategoryModelMapper.toModel(entity).toJSON(),
    );
  }

  async findById(id: string | CategoryId): Promise<Category> {
    const model = await this._get(`${id}`);
    return CategoryModelMapper.toEntity(model);
  }

  async findAll(): Promise<Category[]> {
    const models = await this.categoryModel.findAll();
    return models.map((m) => CategoryModelMapper.toEntity(m));
  }

  async update(entity: Category): Promise<void> {
    await this._get(entity.id);
    await this.categoryModel.update(
      CategoryModelMapper.toModel(entity).toJSON(),
      {
        where: { id: entity.id },
      },
    );
  }

  async delete(id: string | CategoryId): Promise<void> {
    const _id = `${id}`;
    await this._get(_id);
    await this.categoryModel.destroy({
      where: { id: _id },
    });
  }

  private async _get(id: string) {
    const model = await this.categoryModel.findByPk(id, {
      rejectOnEmpty: new NotFoundError(`Entity Not Found using ID ${id}`),
    });
    return model;
  }

  async search(query: CategorySearchParams): Promise<CategorySearchResult> {
    const offset = (query.page - 1) * query.limit;
    const limit = query.limit;
    const { rows, count } = await this.categoryModel.findAndCountAll({
      ...(query.filter && {
        where: {
          name: {
            [Op.like]: `%${query.filter}%`,
          },
        },
      }),
      ...(query.sortBy
        ? {
            order: [
              [
                CategoryModelMapper.toModelPropName(query.sortBy),
                query.sortDir,
              ],
            ],
          }
        : { order: [['created_at', 'asc']] }),
      offset,
      limit,
    });

    return new CategorySearchResult({
      total: count,
      page: query.page,
      limit: query.limit,
      filter: query.filter,
      sortBy: query.sortBy,
      sortDir: query.sortDir,
      items: rows.map((m) => CategoryModelMapper.toEntity(m)),
    });
  }
}
