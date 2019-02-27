import { getRepository } from 'typeorm';
import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
  ValidationArguments
} from 'class-validator';
import { Car } from '../entity/Car';
import { User } from '../entity/User';

@ValidatorConstraint()
export class IsUnique implements ValidatorConstraintInterface {
  async validate(registration: string, args: ValidationArguments) {
    const car = await getRepository(Car).findOne({ registration });
    return !car;
  }
  defaultMessage(args: ValidationArguments) {
    return 'Registration ($value) has been used';
  }
}
export class IsUniqueOwner implements ValidatorConstraintInterface {
  async validate(owner: User, args: ValidationArguments) {
    console.log('car');
    const car = await getRepository(Car).findOne({ owner });
    return !car;
  }
  defaultMessage(args: ValidationArguments) {
    return 'Registration ($value) has been used';
  }
}
