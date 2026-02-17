import { IsEmail, IsString, MinLength } from 'class-validator'; // Если есть class-validator
// Если валидатора нет, просто убери декораторы (@Is...)

export class RegisterDto {
  email: string;
  password: string;
}