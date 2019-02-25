import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Ride } from '../entity/Ride';

export class RideController {
  private rideRepository = getRepository(Ride);

  async all(request: Request, response: Response, next: NextFunction) {}

  async add(request: Request, response: Response, next: NextFunction) {}

  async one(request: Request, response: Response, next: NextFunction) {}

  async remove(request: Request, response: Response, next: NextFunction) {}

  async update(request: Request, response: Response, next: NextFunction) {}
}
