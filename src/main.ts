import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { LoggerService } from './logger/logger.service';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.useGlobalInterceptors(app.get(LoggerInterceptor)); // set up global interceptor
  app.useGlobalFilters(new AllExceptionsFilter(app.get(LoggerService))); // set up global exception filter
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  app
    .get(LoggerService)
    .log(`Server is running on: http://localhost:${port}`, 'Bootstrap');
}

void bootstrap();
