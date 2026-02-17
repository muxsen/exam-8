import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto } from './dto/login.dto'; // Импортируем DTO
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Регистрация' })
  async register(@Body() dto: LoginDto) { // Используем DTO вместо any
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Вход в систему' })
  async login(@Body() dto: LoginDto) { // Теперь появятся поля email и password
    return this.authService.login(dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Обновление токенов' })
  async refresh(@Body() dto: RefreshTokenDto) { // Появятся поля userId и refreshToken
    return this.authService.refreshTokens(dto.userId, dto.refreshToken);
  }
}