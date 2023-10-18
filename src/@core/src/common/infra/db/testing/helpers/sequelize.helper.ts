import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { configTest } from '../../../config';

const defaultSequelizeOptions: SequelizeOptions = {
  dialect: configTest.db.dialect,
  host: configTest.db.host,
  logging: configTest.db.logging
};

export function setupSequelize(options: SequelizeOptions = {}) {
  let _sequelize: Sequelize;
  beforeAll(() => {
    _sequelize = new Sequelize({ ...defaultSequelizeOptions, ...options });
  });

  beforeEach(async () => {
    await _sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await _sequelize.close();
  });

  return {
    get sequelize() {
      return _sequelize;
    }
  };
}

// export function makeSequelizeOptions(config: Config) {

// }
