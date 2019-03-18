import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import { User } from './User';
import { Ride } from './Ride';

@Entity()
export class RideRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ManyToOne(() => Ride, ride => ride.id)
  ride: string;

  @Column()
  @ManyToOne(() => User, user => user.id)
  requestor: string;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
