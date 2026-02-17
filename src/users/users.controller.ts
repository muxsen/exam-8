import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth() // ВАЖНО: Этот декоратор рисует "замок" в Swagger
  @Get('profile')
  @ApiOperation({ summary: 'Получить профиль текущего пользователя' })
  async getProfile(@Request() req) {
    // req.user заполняется автоматически после прохождения JwtAuthGuard
    return req.user;
  }
}