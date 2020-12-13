import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // transforms incoming Javascript objects to their DTO classes
    // disableErrorMessages: true,
    // whitelist: true,
  }));
  await app.listen(3000);
}
bootstrap();
