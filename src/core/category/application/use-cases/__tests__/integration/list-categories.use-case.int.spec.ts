import _chance from 'chance';
import {
  CategoryModel,
  CategoryModelMapper,
  CategorySequelizeRepository,
} from '../../../../../category/infra';
import { setupSequelize } from '../../../../../common/infra/db/testing/helpers/sequelize.helper';
import { CategoryRepository } from '../../../../domain/repository/category.repository';
import { ListCategoriesUseCase } from '../../list-categories.use-case';

const chance = _chance();

describe('ListCategoriesUseCase Integration Tests', () => {
  let useCase: ListCategoriesUseCase;
  let repository: CategoryRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new ListCategoriesUseCase(repository);
  });

  it('should return output with categories ordered by createdAt asc when use empty input', async () => {
    const date = new Date('1998-02-13');
    const models = await CategoryModel.factory()
      .count(2)
      .bulkCreate((index: number) => ({
        id: chance.guid({ version: 4 }),
        name: `Category ${index}`,
        description: `Description ${index}`,
        is_active: true,
        created_at: new Date(date.getTime() + index + 1),
      }));

    const output = await useCase.execute({});

    expect(output).toEqual({
      total: 2,
      page: 1,
      limit: 10,
      lastPage: 1,
      items: [...models].map((m) => CategoryModelMapper.toEntity(m).toJSON()),
    });
  });

  it('should return output when use page, sortBy and filter', async () => {
    const models = CategoryModel.factory().count(4).bulkMake();

    models[0].name = 'aa';
    models[1].name = 'AAA';
    models[2].name = 'AaA';
    models[3].name = 'bb';
    // models[4].name = 'cc';

    await CategoryModel.bulkCreate(models.map((m) => m.toJSON()));

    let output = await useCase.execute({
      page: 1,
      limit: 2,
      sortBy: 'name',
      filter: 'a',
    });
    expect(output).toEqual({
      items: [models[1], models[2]].map((m) =>
        CategoryModelMapper.toEntity(m).toJSON(),
      ),
      total: 3,
      page: 1,
      limit: 2,
      lastPage: 2,
    });

    output = await useCase.execute({
      page: 2,
      limit: 2,
      sortBy: 'name',
      filter: 'a',
    });
    expect(output).toEqual({
      items: [CategoryModelMapper.toEntity(models[0]).toJSON()],
      total: 3,
      page: 2,
      limit: 2,
      lastPage: 2,
    });

    output = await useCase.execute({
      page: 1,
      limit: 2,
      filter: 'a',
      sortBy: 'name',
      sortDir: 'desc',
    });
    expect(output).toEqual({
      items: [models[0], models[2]].map((m) =>
        CategoryModelMapper.toEntity(m).toJSON(),
      ),
      total: 3,
      page: 1,
      limit: 2,
      lastPage: 2,
    });

    output = await useCase.execute({
      page: 2,
      limit: 2,
      filter: 'a',
      sortBy: 'name',
      sortDir: 'desc',
    });
    expect(output).toEqual({
      items: [CategoryModelMapper.toEntity(models[1]).toJSON()],
      total: 3,
      page: 2,
      limit: 2,
      lastPage: 2,
    });
  });
});
