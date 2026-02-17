import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ example: 1, description: 'ID пользователя' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ 
    example: 'eyJhbGciOiJIUzI1Ni...', 
    description: 'Refresh токен, полученный при логине' 
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}