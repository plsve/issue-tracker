import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // transforms incoming Javascript objects to their DTO classes
    // disableErrorMessages: true,
    whitelist: true, // strips away unwanted DTO fields sent from client
    forbidNonWhitelisted: true // throws error if unwanted DTO fields are sent from client
  }));
  await app.listen(3000);

}
bootstrap();
