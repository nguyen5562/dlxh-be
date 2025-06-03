import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { appConfig } from './configs/env.config';
import { ResponseExceptionFilter } from './filter/response-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new ResponseExceptionFilter());
  app.enableCors();
  const port = appConfig.port;
  await app.listen(port);
  console.log(`Server is running on: http://localhost:${port}`);
}

void bootstrap();
