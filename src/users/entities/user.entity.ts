import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'client' })
  role: string;

  @Column({ default: false })
  is2FAEnabled: boolean;

  @Column({ nullable: true, type: 'varchar' }) // Разрешаем null
  twoFASecret: string | null;

  @Column({ nullable: true, type: 'varchar' }) // Разрешаем null
  refreshTokenHash: string | null;

  @CreateDateColumn()
  createdAt: Date;
}