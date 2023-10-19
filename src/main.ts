import { NestFactory } from '@nestjs/core';
import { env } from 'process';
import { AppModule } from './app.module';

const PORT = env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => {
    console.log('API running on port', PORT);
  });
}
bootstrap();
