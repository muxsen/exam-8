import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'test@mail.ru', description: 'Электронная почта пользователя' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Пароль' })
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({ example: 1, description: 'ID пользователя' })
  userId: number;

  @ApiProperty({ example: 'eyJhbGci...', description: 'Refresh токен' })
  refreshToken: string;
}