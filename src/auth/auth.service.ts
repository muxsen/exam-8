import { Injectable, UnauthorizedException, ConflictException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: any) {
    if (!dto || !dto.email) {
      throw new BadRequestException('Данные для регистрации не предоставлены');
    }
    const existing = await this.usersRepository.findOne({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email уже занят');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = this.usersRepository.create({ ...dto, password: hashedPassword });
    
    // ИСПРАВЛЕНО: Сохраняем результат и проверяем, не массив ли это
    const savedResult = await this.usersRepository.save(newUser);
    const user = Array.isArray(savedResult) ? savedResult[0] : savedResult;
    
    // Теперь TypeScript уверен, что у user есть id и role
    return this.generateTokens(user.id, user.role);
  }

  async login(dto: any) {
    const user = await this.usersRepository.findOne({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Неверные учетные данные');
    }
    return this.generateTokens(user.id, user.role);
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user || !user.refreshTokenHash) throw new ForbiddenException('Доступ запрещен');

    const rtMatches = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!rtMatches) throw new ForbiddenException('Неверный токен обновления');

    return this.generateTokens(user.id, user.role);
  }

  async logout(userId: number) {
    await this.usersRepository.update(userId, { refreshTokenHash: null });
    return { message: 'Успешный выход' };
  }

  async generateTokens(userId: number, role: string) {
    const payload = { sub: userId, role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    const hash = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(userId, { refreshTokenHash: hash });

    return { accessToken, refreshToken };
  }
}