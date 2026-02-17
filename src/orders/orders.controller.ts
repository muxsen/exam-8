import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Заказы')
@ApiBearerAuth() // <--- ДОБАВЬ ЭТО: чтобы появился значок замка в Swagger
@Controller('orders')
@UseGuards(JwtAuthGuard) // Защита на весь контроллер
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Оформление нового заказа' })
  async create(@Request() req, @Body() dto: any) {
    const userId = req.user.id; // Здесь берется ID из токена
    return this.ordersService.create(userId, dto);
  }

  @Get('my')
  @ApiOperation({ summary: 'Получить историю заказов текущего пользователя' })
  async findMyOrders(@Request() req) {
    const userId = req.user.id;
    return this.ordersService.findAllByUser(userId);
  }
}