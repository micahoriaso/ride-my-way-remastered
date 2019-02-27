import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';

import { Car } from '../entity/Car';
import { formatResponse } from '../helpers';
import { getCurrentUser } from '../services/jwt';

interface Authenticated {
  decoded: any;
}

export class CarController {
  private carRepository = getRepository(Car);

  async all(
    request: Request & Authenticated,
    response: Response,
    next: NextFunction
  ) {
    try {
      const cars = await this.carRepository.find();
      if (cars.length > 0) {
        return formatResponse({ status: 200, data: cars, response });
      }

      return formatResponse({
        status: 404,
        data: {
          message: 'No cars found'
        },
        response
      });
    } catch (error) {
      return error;
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      const car = await this.carRepository.findOne(request.params.id);
      if (!car) {
        return formatResponse({
          status: 404,
          data: { message: 'Sorry, car not found!' },
          response
        });
      }
      return formatResponse({ status: 200, data: car, response });
    } catch (error) {
      if (error.name === 'QueryFailedError') {
        return formatResponse({
          status: 500,
          data: {
            message:
              'Sorry, there was a problem with the database. Please contact the system administrator'
          },
          response
        });
      }
      return error;
    }
  }

  async save(
    request: Request & Authenticated,
    response: Response,
    next: NextFunction
  ) {
    const { body } = request;
    const currentUser = await getCurrentUser(request.decoded);

    let car = new Car();
    let carRepository = getRepository(Car);
    car.registration = body.registration;
    car.model = body.model;
    car.capacity = body.capacity;
    car.owner = currentUser;
    try {
      const errors = await validate(car, {
        validationError: { target: false },
        groups: ['create']
      });
      if (errors.length > 0) {
        return formatResponse({
          status: 400,
          error: {
            errors
          },
          response
        });
      } else {
        await carRepository.save(car);
        return formatResponse({ status: 201, data: 'Car created', response });
      }
    } catch (error) {
      return error;
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const carToRemove = await this.carRepository.findOne(request.params.id);
    if (!carToRemove) {
      return formatResponse({ status: 404, error: 'Car not found', response });
    }
    try {
      await this.carRepository.remove(carToRemove);
      return formatResponse({ status: 200, data: 'Car deleted', response });
    } catch (error) {
      return error;
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const { body } = request;
    const carToUpdate = await this.carRepository.findOne(request.params.id);
    carToUpdate.registration = body.registration;
    carToUpdate.model = body.model;
    carToUpdate.capacity = body.capacity;
    try {
      const errors = await validate(carToUpdate, {
        validationError: { target: false },
        skipMissingProperties: true,
        groups: ['update']
      });
      if (errors.length > 0) {
        return formatResponse({
          status: 400,
          error: {
            errors
          },
          response
        });
      } else {
        await this.carRepository.save(carToUpdate);
        return formatResponse({ status: 201, data: 'Car updated', response });
      }
    } catch (error) {
      return error;
    }
  }
}
