import { DataType } from 'sequelize-typescript';
import { setupSequelize } from '../../../../common/infra/db/testing/helpers/sequelize.helper';
import { CategoryModel } from './category-model';

describe('CategoryModel Integration Tests', () => {
  setupSequelize({ models: [CategoryModel] });

  test('mapping attributes', () => {
    const attributesMap = CategoryModel.getAttributes();
    const attributes = Object.keys(attributesMap);
    expect(attributes).toEqual([
      'id',
      'name',
      'description',
      'is_active',
      'created_at',
    ]);

    const idAttr = attributesMap.id;
    expect(idAttr).toMatchObject({
      field: 'id',
      fieldName: 'id',
      primaryKey: true,
      type: DataType.UUID(),
    });

    const nameAttr = attributesMap.name;
    expect(nameAttr).toMatchObject({
      field: 'name',
      fieldName: 'name',
      allowNull: false,
      type: DataType.STRING(128),
    });

    const descriptionAttr = attributesMap.description;
    expect(descriptionAttr).toMatchObject({
      field: 'description',
      fieldName: 'description',
      allowNull: true,
      type: DataType.STRING(256),
    });

    const isActiveAttr = attributesMap.is_active;
    expect(isActiveAttr).toMatchObject({
      field: 'is_active',
      fieldName: 'is_active',
      allowNull: false,
      type: DataType.BOOLEAN(),
    });

    const createdAtAttr = attributesMap.created_at;
    expect(createdAtAttr).toMatchObject({
      field: 'created_at',
      fieldName: 'created_at',
      allowNull: false,
    });
    expect(createdAtAttr.type).toEqual(DataType.DATE());
  });

  test('create method', async () => {
    const arrange = {
      id: '01a8171e-6283-4940-a468-41c5c8f49be8',
      name: 'Name',
      is_active: true,
      created_at: new Date(),
    };

    const category = await CategoryModel.create(arrange);

    expect(category.toJSON()).toEqual(arrange);
  });
});
