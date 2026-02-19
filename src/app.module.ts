// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller'; // если он есть
import { AppService } from './app.service';       // наш "виновник"

// Твои другие модули
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // src/app.module.ts
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db.sqlite',
      // Вместо списка [User, Product...] используй паттерн:
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    // УДАЛИ AppService ОТСЮДА!
  ],
  controllers: [AppController],
  providers: [AppService], // AppService ДОЛЖЕН БЫТЬ ЗДЕСЬ
})
export class AppModule { }