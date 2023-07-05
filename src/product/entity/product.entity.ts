import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

export enum Category {
  OTHERS = 'others',
  KIDS = 'kids',
  MENS = 'mens',
  WOMENS = 'womens',
}

@Entity()
export class Product {
  // Unique ID
  @PrimaryGeneratedColumn({})
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ type: 'enum', enum: Category, default: Category.OTHERS })
  category: string;

  @Column()
  quantity: number;

  @Column()
  availablity: boolean;

  @CreateDateColumn()
  createdAt: Date;

  // many products to one user relationship
  @ManyToOne((type) => User, (user) => user.products)
  user: User;
}
