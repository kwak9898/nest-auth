import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'user-name', unique: true })
  userName: string;

  @Column({ name: 'password' })
  password: string;
}
