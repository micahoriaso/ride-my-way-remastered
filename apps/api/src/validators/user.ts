import { getRepository } from 'typeorm';
import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
  ValidationArguments
} from 'class-validator';
import { User } from '../entity/User';

@ValidatorConstraint()
export class IsUniqueEmail implements ValidatorConstraintInterface {
  async validate(email: string, args: ValidationArguments) {
    const user = await getRepository(User).findOne({ email });
    return !user;
  }
  defaultMessage(args: ValidationArguments) {
    return 'Email ($value) has been used';
  }
}

@ValidatorConstraint()
export class IsUniquePhone implements ValidatorConstraintInterface {
  async validate(phone: string, args: ValidationArguments) {
    const user = await getRepository(User).findOne({ phone });
    return !user;
  }
  defaultMessage(args: ValidationArguments) {
    return 'Phone ($value) has been used';
  }
}
