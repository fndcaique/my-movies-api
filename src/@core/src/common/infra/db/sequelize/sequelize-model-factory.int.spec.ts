import { isValidUUID } from '#common/domain';
import _chance from 'chance';
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { setupSequelize } from '../testing/helpers/sequelize.helper';
import { SequelizeModelFactory } from './sequelize-model-factory';

const chance = _chance();

@Table
class StubModel extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ allowNull: false, type: DataType.STRING(256) })
  declare name: string;

  static mockFactory = jest.fn(() => ({
    id: chance.guid({ version: 4 }),
    name: chance.word()
  }));

  static factory() {
    return new SequelizeModelFactory(StubModel, StubModel.mockFactory);
  }
}

describe('SequelizeModelFactory Tests', () => {
  setupSequelize({ models: [StubModel] });

  test('create method', async () => {
    let model = await StubModel.factory().create();
    expect(isValidUUID(model.id)).toBe(true);
    expect(model.id).not.toBeFalsy();
    expect(model.name).not.toBeFalsy();
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);
    let modelFound = await StubModel.findByPk(model.id);
    expect(model.id).toBe(modelFound.id);
    expect(model.name).toBe(modelFound.name);

    model = await StubModel.factory().create({
      id: '01a8171e-6283-4940-a468-41c5c8f49be8',
      name: 'test'
    });
    expect(model.id).toBe('01a8171e-6283-4940-a468-41c5c8f49be8');
    expect(model.name).toBe('test');
    modelFound = await StubModel.findByPk(model.id);
    expect(model.id).toBe(modelFound.id);
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);
  });

  test('make method', async () => {
    let model = StubModel.factory().make();
    expect(isValidUUID(model.id)).toBe(true);
    expect(model.id).not.toBeFalsy();
    expect(model.name).not.toBeFalsy();
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);
    expect(await StubModel.findByPk(model.id)).toBeNull();

    model = StubModel.factory().make({
      id: '01a8171e-6283-4940-a468-41c5c8f49be8',
      name: 'test'
    });
    expect(model.id).toBe('01a8171e-6283-4940-a468-41c5c8f49be8');
    expect(model.name).toBe('test');
    expect(await StubModel.findByPk(model.id)).toBeNull();
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);
  });

  test('bulkCreate method using default count (1)', async () => {
    let models = await StubModel.factory().bulkCreate();
    expect(models).toHaveLength(1);
    expect(models[0].id).not.toBeFalsy();
    expect(models[0].name).not.toBeFalsy();
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);
    let modelFound = await StubModel.findByPk(models[0].id);
    expect(models[0].id).toBe(modelFound.id);
    expect(models[0].name).toBe(modelFound.name);

    models = await StubModel.factory().bulkCreate(() => ({
      id: '01a8171e-6283-4940-a468-41c5c8f49be8',
      name: 'test'
    }));
    expect(models[0].id).toBe('01a8171e-6283-4940-a468-41c5c8f49be8');
    expect(models[0].name).toBe('test');
    modelFound = await StubModel.findByPk(models[0].id);
    expect(models[0].id).toBe(modelFound.id);
    expect(models[0].name).toBe(modelFound.name);
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);
  });

  test('bulkCreate method using count > 1', async () => {
    let models = await StubModel.factory().count(2).bulkCreate();
    expect(models).toHaveLength(2);
    expect(models[0].id).not.toBeFalsy();
    expect(models[0].name).not.toBeFalsy();
    expect(models[1].id).not.toBeFalsy();
    expect(models[1].name).not.toBeFalsy();
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(2);

    let modelFound = await StubModel.findByPk(models[0].id);
    expect(models[0].id).toBe(modelFound.id);
    expect(models[0].name).toBe(modelFound.name);
    modelFound = await StubModel.findByPk(models[1].id);
    expect(models[1].id).toBe(modelFound.id);
    expect(models[1].name).toBe(modelFound.name);

    models = await StubModel.factory()
      .count(2)
      .bulkCreate(() => ({
        id: chance.guid({ version: 4 }),
        name: 'test'
      }));
    expect(models).toHaveLength(2);
    expect(models[0].id).not.toBeFalsy();
    expect(models[0].name).toBe('test');
    expect(models[1].id).not.toBeFalsy();
    expect(models[1].name).toBe('test');
    expect(models[0].id).not.toBe(models[1].id);

    modelFound = await StubModel.findByPk(models[0].id);
    expect(models[0].id).toBe(modelFound.id);
    expect(models[0].name).toBe(modelFound.name);
    modelFound = await StubModel.findByPk(models[1].id);
    expect(models[1].id).toBe(modelFound.id);
    expect(models[1].name).toBe(modelFound.name);

    expect(StubModel.mockFactory).toHaveBeenCalledTimes(2);
  });

  test('bulkMake method using count > 1', async () => {
    let models = await StubModel.factory().count(2).bulkMake();
    expect(models).toHaveLength(2);
    expect(models[0].id).not.toBeFalsy();
    expect(models[0].name).not.toBeFalsy();
    expect(models[1].id).not.toBeFalsy();
    expect(models[1].name).not.toBeFalsy();
    expect(models[0].id).not.toBe(models[1].id);
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(2);

    expect(await StubModel.findByPk(models[0].id)).toBeNull();
    expect(await StubModel.findByPk(models[1].id)).toBeNull();

    models = await StubModel.factory()
      .count(2)
      .bulkMake(() => ({
        id: chance.guid({ version: 4 }),
        name: 'test'
      }));
    expect(models).toHaveLength(2);
    expect(models[0].id).not.toBeFalsy();
    expect(models[0].name).toBe('test');
    expect(models[1].id).not.toBeFalsy();
    expect(models[1].name).toBe('test');
    expect(models[0].id).not.toBe(models[1].id);

    expect(await StubModel.findByPk(models[0].id)).toBeNull();
    expect(await StubModel.findByPk(models[1].id)).toBeNull();

    expect(StubModel.mockFactory).toHaveBeenCalledTimes(2);
  });
});
