import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CONFIG_SCHEMA_TYPE, ConfigModule } from './config/config.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
      imports: [
        ConfigModule.forRoot({
          envFilePath: join(__dirname, './envs/.env.test'),
        }),
      ],
    }).compile();

    appController = app.get<AppController>(AppController);

    const configService =
      app.get<ConfigService<CONFIG_SCHEMA_TYPE>>(ConfigService);

    const dbDialect = configService.get('DB_DIALECT');

    console.log(dbDialect);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
