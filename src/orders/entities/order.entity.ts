import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User) // Просто связь, без ссылки на обратное поле
user: User;

  @Column()
  address: string;

  @Column()
  deliveryType: string;

  @Column('json') // ВАЖНО: используй 'json' для хранения массива товаров
  items: any[];

  @Column('decimal', { default: 0 })
  totalPrice: number;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}