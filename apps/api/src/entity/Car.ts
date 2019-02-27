import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { IsDefined, Validate, Matches, Min, Max } from 'class-validator';
import { IsUnique, IsUniqueOwner } from '../validators/car';
import { User } from './User';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsDefined({ message: 'Registration is required' })
  @Matches(/K([A-Z]{2})\s[0-9]{3}[A-Z]{1}$/, {
    message: 'Registration must take the format KXX 000X e.g. KBY 987H'
  })
  @Validate(IsUnique, { groups: ['create'] })
  registration: string;

  @Column()
  @IsDefined({ message: 'Model is required' })
  model: string;

  @Column()
  @IsDefined({ message: 'Capacity is required' })
  @Min(1, { message: 'Capacity must be more than 0' })
  @Max(10, { message: 'Capacity cannot be more than 10' })
  capacity: number;

  @Validate(IsUniqueOwner, { groups: ['create'] })
  @OneToOne(type => User, owner => owner.id)
  @JoinColumn()
  owner: User;
}
