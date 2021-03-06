import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
  BeforeInsert,
  getRepository,
  OneToOne,
  OneToMany
} from 'typeorm';
import bcrypt from 'bcrypt';
import {
  IsEmail,
  Length,
  MinLength,
  Validate,
  IsDefined
} from 'class-validator';
import { IsUniqueEmail, IsUniquePhone } from '../validators/user';
import { Car } from '../entity/Car';
import { Ride } from '../entity/Ride';

@Entity()
@TableInheritance({
  column: { name: 'type', type: 'varchar' }
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsDefined({ message: 'First name is required' })
  firstName: string;

  @Column()
  @IsDefined({ message: 'Last name is required' })
  lastName: string;

  @Column({ unique: true })
  @Validate(IsUniqueEmail, { groups: ['create'] })
  @IsEmail(
    {},
    {
      message: 'Please enter a valid email'
    }
  )
  email: string;

  @Column({ unique: true })
  @Validate(IsUniquePhone, { groups: ['create'] })
  @Length(10, 10, { message: 'Phone number must be 10 digits' })
  phone: string;

  @Column()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @OneToOne(type => Car, car => car.owner)
  car?: Car;

  @OneToMany(type => Ride, ride => ride.driver)
  ride?: Ride;

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(
      this.password,
      Number(process.env.SALT_ROUNDS)
    );
  }
}
