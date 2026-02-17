import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController], // Это имя должно совпадать с именем в контроллере
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}