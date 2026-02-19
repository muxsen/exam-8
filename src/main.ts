import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Глобальная валидация (Отключаем whitelist, чтобы данные не удалялись)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: false,             // ИЗМЕНЕНО: Больше не удаляем поля!
    forbidNonWhitelisted: false,  // ИЗМЕНЕНО: Не блокируем запрос
    transform: true,              // Оставляем трансформацию типов
  }));

  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('Cyber E-commerce API')
    .setDescription('Документация API интернет-магазина')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Введите JWT токен',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Разрешаем CORS
  app.enableCors();

  // Запуск сервера
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`\n🚀 Сервер успешно запущен на порту ${port}`);
  console.log(`📖 Документация Swagger: http://localhost:${port}/api\n`);
}
bootstrap();