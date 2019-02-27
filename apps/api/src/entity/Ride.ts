import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { User } from './User';
import { RideRequest } from './RideRequest';

@Entity()
export class Ride {
  @PrimaryGeneratedColumn()
  @OneToMany(() => RideRequest, rideRequest => rideRequest.ride)
  id: number;

  @Column()
  time: string;

  @Column()
  date: string;

  @Column()
  pickup: string;

  @Column()
  dropoff: string;

  @Column()
  capacity: number;

  @Column()
  seats_available: number;

  @ManyToOne(() => User, driver => driver.id)
  driver: User;

  @Column({ type: 'money' })
  price: number;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
