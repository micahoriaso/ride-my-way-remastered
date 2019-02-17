import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
  BeforeInsert
} from 'typeorm';
import bcrypt from 'bcrypt';
import { IsEmail, Length, MinLength } from 'class-validator';

@Entity()
@TableInheritance({
  column: { name: 'type', type: 'varchar' }
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  first_name?: string;

  @Column({ nullable: true })
  last_name?: string;

  @Column()
  @IsEmail(
    {},
    {
      message: 'Please enter a valid email'
    }
  )
  email: string;

  @Column()
  @Length(10, 10, { message: 'Phone number must be 10 digits' })
  phone: string;

  @Column()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(
      this.password,
      Number(process.env.SALT_ROUNDS)
    );
  }
}
