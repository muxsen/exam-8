import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ 
    example: 'test@mail.ru', 
    description: 'Электронная почта пользователя' 
  })
  @IsEmail({}, { message: 'Введите корректный email' })
  @IsNotEmpty({ message: 'Email не может быть пустым' })
  email: string;

  @ApiProperty({ 
    example: 'password123', 
    description: 'Пароль (минимум 6 символов)' 
  })
  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  @MinLength(6, { message: 'Пароль должен быть не короче 6 символов' })
  password: string;
}