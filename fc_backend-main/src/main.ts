import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422 /*indica erro de processamento de dados por conta do envio de dado do cliente*/,
    }),
  );
  await app.listen(3333);
}
bootstrap();
