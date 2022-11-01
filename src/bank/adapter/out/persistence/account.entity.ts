import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Account', {})
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;
}
