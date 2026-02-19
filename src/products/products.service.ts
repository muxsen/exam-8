import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto'; // Добавили импорт DTO

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  // Используем CreateProductDto вместо any для типизации
  async create(dto: CreateProductDto) {
    // Эта проверка сработает, если данные не дошли из контроллера
    if (!dto || Object.keys(dto).length === 0) {
      throw new BadRequestException('Данные товара не могут быть пустыми');
    }

    try {
      // Создаем экземпляр сущности на основе DTO
      const newProduct = this.productsRepository.create(dto);
      // Сохраняем в базу данных
      return await this.productsRepository.save(newProduct);
    } catch (error) {
      throw new BadRequestException('Ошибка при сохранении товара: ' + error.message);
    }
  }

  async findAll(search?: string) {
    if (search) {
      return await this.productsRepository.find({
        where: { name: Like(`%${search}%`) },
      });
    }
    return await this.productsRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Товар с ID ${id} не найден`);
    }
    return product;
  }

  async remove(id: number) {
    const result = await this.productsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Товар с ID ${id} не найден`);
    }
    return { success: true, message: `Товар с ID ${id} успешно удален` };
  }
}