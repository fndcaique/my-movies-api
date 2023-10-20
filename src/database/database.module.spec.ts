import { getConnectionToken } from '@nestjs/sequelize';
import { Test } from '@nestjs/testing';
import * as Joi from 'joi';
import { Sequelize } from 'sequelize-typescript';
import { CONFIG_DB_SCHEMA, ConfigModule } from './../config/config.module';
import { DatabaseModule } from './database.module';

describe('DatabaseModule Unit Tests', () => {
  describe('sqlite connection', () => {
    const connOptions = {
      DB_DIALECT: 'sqlite',
      DB_HOST: ':memory:',
      DB_LOGGING: false,
      DB_AUTO_LOAD_MODELS: false,
    };
    it('should be valid', async () => {
      const schema = Joi.object({
        ...CONFIG_DB_SCHEMA,
      });

      const { error } = schema.validate(connOptions);
      expect(error).toBeUndefined();
    });
    it('should be a sqlite connection', async () => {
      const module = await Test.createTestingModule({
        imports: [
          DatabaseModule,
          ConfigModule.forRoot({
            isGlobal: true,
            ignoreEnvFile: true,
            ignoreEnvVars: true,
            validationSchema: null,
            load: [() => connOptions],
          }),
        ],
      }).compile();

      const app = module.createNestApplication();
      const conn = app.get<Sequelize>(getConnectionToken());
      expect(conn).toBeDefined();
      expect(conn.options.dialect).toBe('sqlite');
      expect(conn.options.host).toBe(':memory:');
      expect(conn.options.logging).toBe(false);
      await conn.close();
    });
  });

  describe('postgres connection', () => {
    const connOptions = {
      DB_DIALECT: 'postgres',
      DB_HOST: 'localhost',
      DB_PORT: 8532,
      DB_USERNAME: 'docker-main',
      DB_PASSWORD: 'docker-main',
      DB_DATABASE: 'fnd_store',
      DB_LOGGING: false,
      DB_AUTO_LOAD_MODELS: true,
    };
    it('should be valid', async () => {
      const schema = Joi.object({
        ...CONFIG_DB_SCHEMA,
      });

      const { error } = schema.validate(connOptions);
      expect(error).toBeUndefined();
    });
    it('should be a postgres connection', async () => {
      const module = await Test.createTestingModule({
        imports: [
          DatabaseModule,
          ConfigModule.forRoot({
            isGlobal: true,
            ignoreEnvFile: true,
            ignoreEnvVars: true,
            validationSchema: null,
            load: [() => connOptions],
          }),
        ],
      }).compile();

      const app = module.createNestApplication();
      const conn = app.get<Sequelize>(getConnectionToken());

      expect(conn).toBeDefined();
      expect(conn.options.dialect).toBe('postgres');
      expect(conn.options.host).toBe('localhost');
      expect(conn.options.port).toBe(8532);
      expect(conn.options.username).toBe('docker-main');
      expect(conn.options.password).toBe('docker-main');
      expect(conn.options.database).toBe('fnd_store');
      expect(conn.options.logging).toBe(false);
      await conn.close();
    });
  });
});
