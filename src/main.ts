import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  ); // Add this line
  await app.listen(3000);
}
bootstrap();
