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
import {
  IsDefined,
  IsMilitaryTime,
  Validate,
  Matches,
  Min,
  Max,
  IsNumber
} from 'class-validator';
import { MinDate, ValidDate, HasCar } from '../validators/ride';

export enum RideStatus {
  IN_OFFER = 'IN_OFFER',
  STARTED = 'STARTED',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED'
}

@Entity()
export class Ride {
  @PrimaryGeneratedColumn()
  @OneToMany(() => RideRequest, rideRequest => rideRequest.ride)
  id: number;

  @IsDefined({ message: 'Time is required' })
  @IsMilitaryTime({
    message: 'Time should of the format HH:MM and between 00:00 to 23:59'
  })
  @Column()
  time: string;

  @IsDefined({ message: 'Date is required' })
  @Matches(
    /^(19[5-9][0-9]|20[0-4][0-9]|2050)[-](0?[1-9]|1[0-2])[-](0?[1-9]|[12][0-9]|3[01])$/,
    {
      message: 'Date must take the format YYYY-MM-DD'
    }
  )
  @Validate(ValidDate)
  @Validate(MinDate)
  @Column()
  date: string;

  @IsDefined({ message: 'Pickup is required' })
  @Column()
  pickup: string;

  @IsDefined({ message: 'Dropoff is required' })
  @Column()
  dropoff: string;

  @Column()
  capacity: number;

  @Column()
  seats_available: number;

  @ManyToOne(() => User, driver => driver.id)
  @Validate(HasCar)
  driver: User;

  @IsDefined({ message: 'Price is required' })
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(50, { message: 'Price must be Kshs. 50 or more' })
  @Max(50000, { message: 'Price must be Kshs. 50,000 or less' })
  @Column({ type: 'money' })
  price: number;

  @Column({
    type: 'enum',
    enum: RideStatus,
    default: RideStatus.IN_OFFER
  })
  status: RideStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
