import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Config } from './../../../config';

const defaultSequelizeOptions: SequelizeOptions = {
  dialect: Config.db().dialect,
  host: Config.db().host,
  logging: Config.db().logging ? undefined : false,
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
    },
  };
}

// export function makeSequelizeOptions(config: Config) {

// }
