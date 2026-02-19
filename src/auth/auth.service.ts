import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService, // Добавили ConfigService
  ) {}

  async register(dto: LoginDto) {
    const { email, password } = dto;

    try {
      const candidate = await this.userRepository.findOne({ where: { email } });
      if (candidate) {
        throw new ConflictException('Пользователь с таким email уже существует');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = this.userRepository.create({
        email,
        password: hashedPassword,
      });
      
      const savedUser = await this.userRepository.save(user);
      const { password: _, ...userWithoutPassword } = savedUser;
      return userWithoutPassword;
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      console.error('Ошибка регистрации:', error);
      throw new InternalServerErrorException('Ошибка при сохранении пользователя');
    }
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const tokens = await this.generateTokens(user.id, 'user');

    return {
      user: { id: user.id, email: user.email },
      ...tokens,
    };
  }

  async generateTokens(userId: number, role: string) {
    const payload = { sub: userId, role };
    const secret = this.configService.get<string>('JWT_SECRET');

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: secret,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: secret, // Для простоты используем один секрет, но можно разные
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async refreshTokens(userId: number, refreshToken: string) {
    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      const payload = await this.jwtService.verifyAsync(refreshToken, { secret });

      if (!payload || payload.sub !== userId) {
        throw new UnauthorizedException('Доступ запрещен');
      }

      return this.generateTokens(payload.sub, payload.role);
    } catch (e) {
      throw new UnauthorizedException('Токен невалиден или просрочен');
    }
  }
}