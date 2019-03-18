import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { Ride, RideStatus } from '../entity/Ride';
import { Car } from '../entity/Car';
import { formatResponse } from '../helpers';
import { getCurrentUser, Authenticated } from '../services/jwt';

export class RideController {
  private rideRepository = getRepository(Ride);
  private carRepository = getRepository(Car);

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      const rides = await this.rideRepository.find({ relations: ['driver'] });
      if (rides.length > 0) {
        return formatResponse({ status: 200, data: rides, response });
      }
      return formatResponse({
        status: 404,
        data: {
          message: 'No rides found'
        },
        response
      });
    } catch (error) {
      return error;
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      const ride = await this.rideRepository.findOne(request.params.id, {
        relations: ['driver']
      });
      if (!ride) {
        return formatResponse({
          status: 404,
          data: { message: 'Sorry, ride not found!' },
          response
        });
      }
      return formatResponse({ status: 200, data: ride, response });
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
    const car = await this.carRepository.findOne({ owner: currentUser.id });

    let ride = new Ride();
    let rideRepository = getRepository(Ride);
    try {
      ride.time = body.time;
      ride.date = body.date;
      ride.pickup = body.pickup;
      ride.dropoff = body.dropoff;
      ride.price = body.price;
      ride.status = RideStatus.IN_OFFER;
      ride.driver = currentUser;
      const errors = await validate(ride, {
        validationError: { target: false, value: false }
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
        ride.capacity = car.capacity;
        ride.seatsAvailable = car.capacity;
        await rideRepository.save(ride);
        return formatResponse({ status: 201, data: 'Ride created', response });
      }
    } catch (error) {
      return error;
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const rideToRemove = await this.rideRepository.findOne(request.params.id);
    if (!rideToRemove) {
      return formatResponse({ status: 404, error: 'Ride not found', response });
    }
    try {
      await this.rideRepository.remove(rideToRemove);
      return formatResponse({ status: 200, data: 'Ride deleted', response });
    } catch (error) {
      return error;
    }
  }

  async update(
    request: Request & Authenticated,
    response: Response,
    next: NextFunction
  ) {
    const { body } = request;
    const rideToUpdate = await this.rideRepository.findOne(request.params.id);
    const currentUser = await getCurrentUser(request.decoded);
    rideToUpdate.time = body.time;
    rideToUpdate.date = body.date;
    rideToUpdate.pickup = body.pickup;
    rideToUpdate.dropoff = body.dropoff;
    rideToUpdate.capacity = body.capacity;
    rideToUpdate.seatsAvailable = body.seats_available;
    rideToUpdate.price = body.price;
    rideToUpdate.driver = currentUser;
    try {
      const errors = await validate(rideToUpdate, {
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
        await this.rideRepository.save(rideToUpdate);
        return formatResponse({ status: 201, data: 'Ride updated', response });
      }
    } catch (error) {
      return error;
    }
  }
}
