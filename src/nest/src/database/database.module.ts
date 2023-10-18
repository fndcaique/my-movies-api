import { CategoryModel } from '@fnd/core/category/infra';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CONFIG_SCHEMA_TYPE } from 'src/config/config.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: async (configService: ConfigService<CONFIG_SCHEMA_TYPE>) => {
        const models = [CategoryModel];

        if (configService.get('DB_DIALECT') === 'sqlite') {
          return {
            dialect: 'sqlite',
            host: configService.get('DB_HOST'),
            models,
            autoLoadModels: configService.get('DB_AUTO_LOAD_MODELS'),
            logging: configService.get('DB_LOGGING'),
          };
        }

        if (configService.get('DB_DIALECT') === 'postgres') {
          return {
            dialect: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_DATABASE'),
            models,
            autoLoadModels: configService.get('DB_AUTO_LOAD_MODELS'),
            logging: configService.get('DB_LOGGING'),
          };
        }

        throw new Error('Unsupported database config');
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
