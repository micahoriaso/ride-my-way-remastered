import { Entity, PrimaryColumn, Column, getRepository } from 'typeorm';
import { IsDefined, Validate } from 'class-validator';
import { IsUnique } from '../validators/car';

@Entity()
export class Car {
  @PrimaryColumn()
  @IsDefined({ message: 'Registration is required' })
  @Validate(IsUnique)
  id: string;

  @Column()
  @IsDefined({ message: 'Model is required' })
  model: string;

  @Column()
  @IsDefined({ message: 'Capacity is required' })
  capacity: number;
}
