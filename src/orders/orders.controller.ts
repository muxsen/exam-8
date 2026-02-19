import { Controller, Post, Body, UseGuards, Req, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiTags('Заказы')
@ApiBearerAuth('JWT-auth')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Оформление нового заказа' })
  async create(@Body() createOrderDto: CreateOrderDto, @Req() req: any) {
    const userId = req.user.id;
    return this.ordersService.create(userId, createOrderDto);
  }

  // НОВЫЙ МЕТОД: Изменение количества (Пункт: Countni oshira olishi)
  @UseGuards(JwtAuthGuard)
  @Patch(':id/quantity')
  @ApiOperation({ summary: 'Изменить количество товара в заказе' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        quantity: { type: 'number', example: 5 }
      }
    }
  })
  async updateQuantity(
    @Param('id', ParseIntPipe) id: number,
    @Body('quantity') quantity: number,
  ) {
    return this.ordersService.updateQuantity(id, quantity);
  }

  // НОВЫЙ МЕТОД: Удаление заказа (Пункт: Harid qilingan ro’yhatdan o’chira olishi)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Отменить/удалить заказ' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }
}