import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // ОБЯЗАТЕЛЬНО
export class Product { // ОБЯЗАТЕЛЬНО export
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  stock: number;
}