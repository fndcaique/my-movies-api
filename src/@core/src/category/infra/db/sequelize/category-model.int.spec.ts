import { DataType, Sequelize } from 'sequelize-typescript';
import { CategoryModel } from './category-model';

describe('CategoryModel Integration Tests', () => {
  let sequelize: Sequelize;

  beforeAll(() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      host: ':memory:',
      logging: true,
      models: [CategoryModel]
    });
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('mapping attributes', () => {
    const attributesMap = CategoryModel.getAttributes();
    console.log(attributesMap);

    const attributes = Object.keys(attributesMap);
    expect(attributes).toEqual([
      'id',
      'name',
      'description',
      'isActive',
      'createdAt'
    ]);

    const idAttr = attributesMap.id;
    expect(idAttr).toMatchObject({
      field: 'id',
      fieldName: 'id',
      primaryKey: true,
      type: DataType.UUID()
    });

    const nameAttr = attributesMap.name;
    expect(nameAttr).toMatchObject({
      field: 'name',
      fieldName: 'name',
      allowNull: false,
      type: DataType.STRING(128)
    });

    const descriptionAttr = attributesMap.description;
    expect(descriptionAttr).toMatchObject({
      field: 'description',
      fieldName: 'description',
      allowNull: true,
      type: DataType.STRING(256)
    });

    const isActiveAttr = attributesMap.isActive;
    expect(isActiveAttr).toMatchObject({
      field: 'isActive',
      fieldName: 'isActive',
      allowNull: false,
      type: DataType.BOOLEAN()
    });

    const createdAtAttr = attributesMap.createdAt;
    expect(createdAtAttr).toMatchObject({
      field: 'createdAt',
      fieldName: 'createdAt',
      allowNull: false
    });
    expect(createdAtAttr.type).toEqual(DataType.DATE());
  });

  test('create', async () => {
    const arrange = {
      id: '01a8171e-6283-4940-a468-41c5c8f49be8',
      name: 'Name',
      isActive: true,
      createdAt: new Date()
    };

    const category = await CategoryModel.create(arrange);

    expect(category.toJSON()).toEqual(arrange);
  });
});
