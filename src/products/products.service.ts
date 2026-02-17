import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(dto: any) {
    if (!dto || Object.keys(dto).length === 0) {
      throw new BadRequestException('Данные товара не могут быть пустыми');
    }
    const newProduct = this.productsRepository.create(dto);
    return await this.productsRepository.save(newProduct);
  }

  // ИСПРАВЛЕНО: Добавлен необязательный параметр search (ошибка TS2554)
  async findAll(search?: string) {
    if (search) {
      return await this.productsRepository.find({
        where: { name: Like(`%${search}%`) },
      });
    }
    return await this.productsRepository.find();
  }

  // ИСПРАВЛЕНО: Добавлен метод findOne (ошибка TS2339)
  async findOne(id: number) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Товар с ID ${id} не найден`);
    }
    return product;
  }

  // ИСПРАВЛЕНО: Добавлен метод remove (ошибка TS2339)
  async remove(id: number) {
    const result = await this.productsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Товар с ID ${id} не найден`);
    }
    return { success: true };
  }
}