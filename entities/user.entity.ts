import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user-name', unique: true })
  userName: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'first-name' })
  firstName: string;

  @Column({ name: 'last-name' })
  lastName: string;

  @Column({ name: 'is-active', default: true })
  isActive: boolean;
}
