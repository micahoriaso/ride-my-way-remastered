import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
  ValidationArguments
} from 'class-validator';
import { getRepository } from 'typeorm';
import moment from 'moment';
import { User } from '../entity/User';

@ValidatorConstraint()
export class MinDate implements ValidatorConstraintInterface {
  async validate(date: string, args: ValidationArguments) {
    const rideDate = moment(date, 'YYYY-MM-DD');
    const todaysDate = moment(moment().format('YYYY-MM-DD'));
    return rideDate >= todaysDate;
  }
  defaultMessage(args: ValidationArguments) {
    return 'Date ($value) cannot be in the past';
  }
}

@ValidatorConstraint()
export class ValidDate implements ValidatorConstraintInterface {
  async validate(date: string, args: ValidationArguments) {
    const rideDate = moment(date, 'YYYY-MM-DD');
    return rideDate.isValid();
  }
  defaultMessage(args: ValidationArguments) {
    return 'Date ($value) must be a valid date';
  }
}

@ValidatorConstraint()
export class HasCar implements ValidatorConstraintInterface {
  async validate(driver: string, args: ValidationArguments) {
    const userRepository = await getRepository(User);
    const rideDriver = await userRepository.findOne(driver, {
      relations: ['car']
    });
    return Boolean(rideDriver.car);
  }
  defaultMessage(args: ValidationArguments) {
    return 'You need to have a car to offer a ride';
  }
}
