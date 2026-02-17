import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('Cyber E-commerce API')
    .setDescription('Документация API интернет-магазина')
    .setVersion('1.0')
    .addBearerAuth() // ВАЖНО: Эта строка добавляет поддержку токенов в Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(3000);
  console.log(`🚀 Сервер запущен на http://localhost:3000/api`);
}
bootstrap();