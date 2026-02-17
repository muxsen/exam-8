import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ 
    example: 'iPhone 15 Pro', 
    description: 'Наименование товара' 
  })
  name: string;

  @ApiProperty({ 
    example: 'Флагманский смартфон от Apple', 
    description: 'Описание товара',
    required: false 
  })
  description?: string;

  @ApiProperty({ 
    example: 120000, 
    description: 'Цена товара в сумах или USD' 
  })
  price: number;

  @ApiProperty({ 
    example: 15, 
    description: 'Количество товара на складе' 
  })
  stock: number;

  @ApiProperty({ 
    example: 'Электроника', 
    description: 'Категория товара',
    required: false 
  })
  category?: string;

  @ApiProperty({ 
    example: 'https://example.com/image.jpg', 
    description: 'Ссылка на изображение товара',
    required: false 
  })
  imageUrl?: string;
}