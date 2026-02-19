import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  // Оформление заказа
  async create(userId: number, dto: CreateOrderDto) {
    try {
      const orderData: any = {
        user: { id: userId },
        address: dto.address,
        deliveryType: dto.deliveryType,
        items: dto.items,
        status: 'pending',
        totalPrice: 0,
      };

      const result = await this.ordersRepository.insert(orderData);
      const orderId = result.identifiers[0].id;

      return await this.ordersRepository.findOne({
        where: { id: orderId },
        relations: ['user'],
      });
    } catch (error) {
      throw new BadRequestException('Не удалось сохранить заказ: ' + error.message);
    }
  }

  // Изменение количества (Пункт: Countni oshira olishi)
  async updateQuantity(id: number, quantity: number) {
    const order = await this.ordersRepository.findOne({ where: { id } });
    
    if (!order) {
      throw new NotFoundException('Заказ не найден');
    }

    if (order.items && order.items.length > 0) {
      // Обновляем количество в первом товаре массива для примера
      order.items[0].quantity = quantity;
    }

    // Сохраняем обновленный объект (save сделает UPDATE, так как есть ID)
    return await this.ordersRepository.save(order);
  }

  // Удаление заказа (Пункт: Harid qilingan ro’yhatdan o’chira olishi)
  async remove(id: number) {
    const order = await this.ordersRepository.findOne({ where: { id } });
    
    if (!order) {
      throw new NotFoundException('Заказ не найден');
    }

    await this.ordersRepository.remove(order);
    return { message: `Заказ #${id} успешно удален` };
  }

  // Получение всех заказов
  async findAll() {
    return await this.ordersRepository.find({ relations: ['user'] });
  }
}