import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto'; // Импортируем наш DTO
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Товары')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый товар' })
  // Благодаря CreateProductDto, Swagger сам нарисует все поля
  async create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все товары (с поиском по имени)' })
  async findAll(@Query('search') search: string) {
    return this.productsService.findAll(search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить информацию о товаре по ID' })
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить товар' })
  async remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}