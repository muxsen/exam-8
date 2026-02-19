import { Controller, Post, Body, Get, Query, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Товары')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый товар' })
  // ВАЖНО: Декоратор @Body() должен стоять прямо перед dto
  async create(@Body() createProductDto: CreateProductDto) {
    console.log('Данные в контроллере:', createProductDto); // Добавил лог для проверки в терминале
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все товары' })
  async findAll(@Query('search') search: string) {
    return this.productsService.findAll(search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить товар по ID' })
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить товар' })
  async remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}