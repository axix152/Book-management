import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable validation pipe globally
  app.useGlobalPipes(
    new ValidationPipe({
      // remove any properties that are not in the DTO
      whitelist: true,
      // Throw an error if extra properties are present
      forbidNonWhitelisted: true,
      // transform the incoming data to the DTO type
      transform: true,
    }),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Book Management API')
    .setDescription('API documentation for book inventory management')
    .setVersion('1.0.0')
    .addTag('Books API')
    .build();

  // create Swagger document
  const document = SwaggerModule.createDocument(app, config);
  // setup Swagger UI
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
