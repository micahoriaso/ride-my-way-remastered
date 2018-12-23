import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { Driver } from "./Driver";
import { RideRequest } from "./RideRequest";

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

  @Column()
  @ManyToOne(() => Driver, driver => driver.id)
  driver: string;

  @Column({ type: "money" })
  price: number;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
