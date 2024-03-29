import { DynamicModule, Module } from '@nestjs/common';
import {
  ConfigModuleOptions,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import * as Joi from 'joi';
import { join } from 'path';

type DB_SCHEMA_TYPE = {
  DB_DIALECT: 'postgres' | 'sqlite';
  DB_HOST: string;
  DB_USERNAME?: string;
  DB_PASSWORD?: string;
  DB_DATABASE?: string;
  DB_PORT?: number;
  DB_LOGGING?: false;
  DB_AUTO_LOAD_MODELS: boolean;
};

export const CONFIG_DB_SCHEMA: Joi.StrictSchemaMap<DB_SCHEMA_TYPE> = {
  DB_DIALECT: Joi.string().required().valid('postgres', 'sqlite'),
  DB_HOST: Joi.string().required(),
  DB_DATABASE: Joi.string().when('DB_DIALECT', {
    is: 'postgres',
    then: Joi.required(),
  }),
  DB_USERNAME: Joi.string().when('DB_DIALECT', {
    is: 'postgres',
    then: Joi.required(),
  }),
  DB_PASSWORD: Joi.string().when('DB_DIALECT', {
    is: 'postgres',
    then: Joi.required(),
  }),
  DB_PORT: Joi.number().integer().when('DB_DIALECT', {
    is: 'postgres',
    then: Joi.required(),
  }),
  DB_LOGGING: Joi.boolean().required(),
  DB_AUTO_LOAD_MODELS: Joi.boolean().required(),
};

export type CONFIG_SCHEMA_TYPE = DB_SCHEMA_TYPE;

@Module({})
export class ConfigModule extends NestConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
    const { envFilePath, ...otherOptions } = options;
    const dynamicModule = super.forRoot({
      isGlobal: true,
      envFilePath: [
        ...(Array.isArray(envFilePath) ? envFilePath : [envFilePath]),
        join(__dirname, `../../envs/.env.${process.env.NODE_ENV}`),
        join(__dirname, '../../envs/.env'),
      ],
      validationSchema: Joi.object({ ...CONFIG_DB_SCHEMA }),
      ...otherOptions,
    });
    return dynamicModule;
  }
}
