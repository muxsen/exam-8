import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('order') // Название таблицы в единственном числе, как у тебя
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  deliveryType: string; // 'delivery' или 'pickup'

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  totalAmount: number;

  @Column({ default: 'pending' }) // Добавил это поле, чтобы сервис не выдавал ошибку!
  status: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column('simple-json', { nullable: true })
  items: any;

  @CreateDateColumn()
  createdAt: Date;
}