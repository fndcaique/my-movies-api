import { Test } from '@nestjs/testing';
import { fail } from 'assert';
import Joi from 'joi';
import { join } from 'path';
import { CONFIG_DB_SCHEMA, ConfigModule } from '../config.module';

function expectValidateError(schema: Joi.Schema, value: any) {
  return expect(schema.validate(value, { abortEarly: false }).error.message);
}
describe('Schema Unit Tests', () => {
  describe('DB Schema', () => {
    const schema = Joi.object({ ...CONFIG_DB_SCHEMA });

    describe('DB_DIALECT', () => {
      test('invalid cases', () => {
        expectValidateError(schema, {}).toContain('"DB_DIALECT" is required');

        expectValidateError(schema, { DB_DIALECT: 5 }).toContain(
          '"DB_DIALECT" must be one of [postgres, sqlite]',
        );
      });

      test('valid cases', () => {
        const arrange = ['postgres', 'sqlite'];

        arrange.forEach((DB_DIALECT) => {
          expectValidateError(schema, { DB_DIALECT }).not.toContain(
            'DB_DIALECT',
          );
        });
      });
    });

    describe('DB_HOST', () => {
      test('invalid cases', () => {
        expectValidateError(schema, {}).toContain('"DB_HOST" is required');

        expectValidateError(schema, { DB_HOST: 5 }).toContain(
          '"DB_HOST" must be a string',
        );
      });

      test('valid cases', () => {
        const arrange = ['some value', 'localhost', 'www'];

        arrange.forEach((DB_HOST) => {
          expectValidateError(schema, { DB_HOST }).not.toContain('DB_HOST');
        });
      });
    });

    describe('DB_DATABASE', () => {
      test('invalid cases', () => {
        expectValidateError(schema, { DB_DIALECT: 'sqlite' }).not.toContain(
          '"DB_DATABASE" is required',
        );

        expectValidateError(schema, { DB_DIALECT: 'postgres' }).toContain(
          '"DB_DATABASE" is required',
        );

        expectValidateError(schema, { DB_DATABASE: 1 }).toContain(
          '"DB_DATABASE" must be a string',
        );
      });

      test('valid cases', () => {
        const arrange = [
          {
            DB_DIALECT: 'sqlite',
          },
          {
            DB_DIALECT: 'sqlite',
            DB_DATABASE: 'some value',
          },
          {
            DB_DIALECT: 'postgres',
            DB_DATABASE: 'some value',
          },
        ];

        arrange.forEach((value) => {
          expectValidateError(schema, value).not.toContain('DB_DATABASE');
        });
      });
    });

    describe('DB_USERNAME', () => {
      test('invalid cases', () => {
        expectValidateError(schema, { DB_DIALECT: 'sqlite' }).not.toContain(
          '"DB_USERNAME" is required',
        );

        expectValidateError(schema, { DB_DIALECT: 'postgres' }).toContain(
          '"DB_USERNAME" is required',
        );

        expectValidateError(schema, { DB_USERNAME: 1 }).toContain(
          '"DB_USERNAME" must be a string',
        );
      });

      test('valid cases', () => {
        const arrange = [
          {
            DB_DIALECT: 'sqlite',
          },
          {
            DB_DIALECT: 'sqlite',
            DB_USERNAME: 'some value',
          },
          {
            DB_DIALECT: 'postgres',
            DB_USERNAME: 'some value',
          },
        ];

        arrange.forEach((value) => {
          expectValidateError(schema, value).not.toContain('DB_USERNAME');
        });
      });
    });

    describe('DB_PASSWORD', () => {
      test('invalid cases', () => {
        expectValidateError(schema, { DB_DIALECT: 'sqlite' }).not.toContain(
          '"DB_PASSWORD" is required',
        );

        expectValidateError(schema, { DB_DIALECT: 'postgres' }).toContain(
          '"DB_PASSWORD" is required',
        );

        expectValidateError(schema, { DB_PASSWORD: 1 }).toContain(
          '"DB_PASSWORD" must be a string',
        );
      });

      test('valid cases', () => {
        const arrange = [
          {
            DB_DIALECT: 'sqlite',
          },
          {
            DB_DIALECT: 'sqlite',
            DB_PASSWORD: 'some value',
          },
          {
            DB_DIALECT: 'postgres',
            DB_PASSWORD: 'some value',
          },
        ];

        arrange.forEach((value) => {
          expectValidateError(schema, value).not.toContain('DB_PASSWORD');
        });
      });
    });

    describe('DB_PORT', () => {
      test('invalid cases', () => {
        expectValidateError(schema, { DB_DIALECT: 'sqlite' }).not.toContain(
          '"DB_PORT" is required',
        );

        expectValidateError(schema, { DB_DIALECT: 'postgres' }).toContain(
          '"DB_PORT" is required',
        );

        expectValidateError(schema, { DB_PORT: 'asdf' }).toContain(
          '"DB_PORT" must be a number',
        );

        expectValidateError(schema, { DB_PORT: '1.2' }).toContain(
          '"DB_PORT" must be an integer',
        );
      });

      test('valid cases', () => {
        const arrange = [
          {
            DB_DIALECT: 'sqlite',
          },
          {
            DB_DIALECT: 'sqlite',
            DB_PORT: 1234,
          },
          {
            DB_DIALECT: 'sqlite',
            DB_PORT: '1234',
          },
          {
            DB_DIALECT: 'postgres',
            DB_PORT: 4321,
          },
          {
            DB_DIALECT: 'postgres',
            DB_PORT: '4321',
          },
        ];

        arrange.forEach((value) => {
          expectValidateError(schema, value).not.toContain('DB_PORT');
        });
      });
    });

    describe('DB_LOGGING', () => {
      test('invalid cases', () => {
        expectValidateError(schema, {}).toContain('"DB_LOGGING" is required');

        expectValidateError(schema, { DB_LOGGING: 'A' }).toContain(
          '"DB_LOGGING" must be a boolean',
        );

        expectValidateError(schema, { DB_LOGGING: 1 }).toContain(
          '"DB_LOGGING" must be a boolean',
        );

        expectValidateError(schema, { DB_LOGGING: '1.2' }).toContain(
          '"DB_LOGGING" must be a boolean',
        );
      });

      test('valid cases', () => {
        const arrange = [
          {
            DB_LOGGING: true,
          },
          {
            DB_LOGGING: 'true',
          },
          {
            DB_LOGGING: false,
          },
          {
            DB_LOGGING: 'false',
          },
        ];

        arrange.forEach((value) => {
          expectValidateError(schema, value).not.toContain('DB_LOGGING');
        });
      });
    });

    describe('DB_AUTO_LOAD_MODELS', () => {
      test('invalid cases', () => {
        expectValidateError(schema, {}).toContain(
          '"DB_AUTO_LOAD_MODELS" is required',
        );

        expectValidateError(schema, { DB_AUTO_LOAD_MODELS: 'A' }).toContain(
          '"DB_AUTO_LOAD_MODELS" must be a boolean',
        );

        expectValidateError(schema, { DB_AUTO_LOAD_MODELS: 1 }).toContain(
          '"DB_AUTO_LOAD_MODELS" must be a boolean',
        );

        expectValidateError(schema, { DB_AUTO_LOAD_MODELS: '1.2' }).toContain(
          '"DB_AUTO_LOAD_MODELS" must be a boolean',
        );
      });

      test('valid cases', () => {
        const arrange = [
          {
            DB_AUTO_LOAD_MODELS: true,
          },
          {
            DB_AUTO_LOAD_MODELS: 'true',
          },
          {
            DB_AUTO_LOAD_MODELS: false,
          },
          {
            DB_AUTO_LOAD_MODELS: 'false',
          },
        ];

        arrange.forEach((value) => {
          expectValidateError(schema, value).not.toContain(
            'DB_AUTO_LOAD_MODELS',
          );
        });
      });
    });
  });
});

describe('ConfigModule Unit Tests', () => {
  it('should throw an error when env vars are invalid', () => {
    try {
      Test.createTestingModule({
        imports: [
          ConfigModule.forRoot({
            envFilePath: join(__dirname, '.env.fake'),
          }),
        ],
      });
      fail('ConfigModule should throw an error when env vars are invalid');
    } catch (e) {
      expect(e.message).toContain(
        '"DB_DIALECT" must be one of [postgres, sqlite]',
      );
    }
  });

  it('should be valid', () => {
    const module = Test.createTestingModule({
      imports: [ConfigModule.forRoot({})],
    });
    expect(module).toBeDefined();
  });
});
