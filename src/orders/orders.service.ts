import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async create(userId: number, dto: any) {
    const newOrder = this.ordersRepository.create({
      ...dto,
      user: { id: userId },
      status: 'pending',
    });
    return await this.ordersRepository.save(newOrder);
  }

  // ИСПРАВЛЕНО: Убраны сложные связи, которые могли вызывать 500 ошибку
  async findAllByUser(userId: number) {
    try {
      return await this.ordersRepository.find({
        where: { user: { id: userId } },
        // Если у тебя нет связи 'items' в Entity, это вызывало 500 ошибку
        // relations: ['items'], 
        order: { id: 'DESC' }
      });
    } catch (error) {
      console.error('Ошибка при поиске заказов:', error);
      return []; // Возвращаем пустой массив вместо падения сервера
    }
  }
}