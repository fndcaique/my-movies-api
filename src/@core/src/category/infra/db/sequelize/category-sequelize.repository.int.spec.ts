import { Category } from '#category/domain';
import { NotFoundError, UniqueEntityId } from '#common/domain';
import { setupSequelize } from '#common/infra/db/testing/helpers/sequelize.helper';
import { CategoryModel } from './category-model';
import { CategorySequelizeRepository } from './category-sequelize.repository';

describe('CategorySequelizeRepository Integration Tests', () => {
  setupSequelize({ models: [CategoryModel] });

  let repository: CategorySequelizeRepository;
  beforeEach(async () => {
    repository = new CategorySequelizeRepository(CategoryModel);
  });

  it('should insert a new entity', async () => {
    let category = new Category({ name: 'Name' });
    await repository.insert(category);
    let model = await CategoryModel.findByPk(category.id);
    expect(model.toJSON()).toEqual(category.toJSON());

    category = new Category({ name: 'Name', description: 'Description' });
    await repository.insert(category);
    model = await CategoryModel.findByPk(category.id);
    expect(model.toJSON()).toEqual(category.toJSON());
  });

  it('should insert a new entity', async () => {
    const category = new Category({ name: 'Name' });
    await repository.insert(category);
    const model = await CategoryModel.findByPk(category.id);

    expect(model.toJSON()).toEqual(category.toJSON());
  });

  it('should throw error when entity not found', async () => {
    await expect(repository.findById('fake id')).rejects.toThrow(
      new NotFoundError('Entity Not Found using ID fake id')
    );

    await expect(
      repository.findById('0a8b9e21-b580-4a17-a88f-3080aa7d5b88')
    ).rejects.toThrow(
      new NotFoundError(
        'Entity Not Found using ID 0a8b9e21-b580-4a17-a88f-3080aa7d5b88'
      )
    );

    await expect(
      repository.findById(
        new UniqueEntityId('0a8b9e21-b580-4a17-a88f-3080aa7d5b88')
      )
    ).rejects.toThrow(
      new NotFoundError(
        'Entity Not Found using ID 0a8b9e21-b580-4a17-a88f-3080aa7d5b88'
      )
    );
  });

  it('should find an entity by id', async () => {
    const entity = new Category({ name: 'name' });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toEqual(entityFound.toJSON());

    entityFound = await repository.findById(entity.uniqueEntityId);
    expect(entity.toJSON()).toEqual(entityFound.toJSON());
  });

  it('should return all categories', async () => {
    const entity = new Category({ name: 'Name' });
    await repository.insert(entity);
    let entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(entities).toEqual([entity]);

    const entity2 = new Category({ name: 'Name 2' });
    await repository.insert(entity2);
    entities = await repository.findAll();
    expect(entities).toHaveLength(2);
    expect(entities).toEqual([entity, entity2]);
  });

  test('search', async () => {
    await CategoryModel.factory().create();
    console.log(await CategoryModel.findAll());
  });
});
