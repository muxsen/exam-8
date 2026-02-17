import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { Product } from '../products/entities/product.entity'; // Добавь импорт сущности продукта
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    // Добавляем сюда Product, чтобы OrdersService мог использовать ProductRepository
    TypeOrmModule.forFeature([Order, Product]), 
    AuthModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}