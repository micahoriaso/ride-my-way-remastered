import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { RideRequest } from '../entity/RideRequest';

export class RideController {
  private rideRequestRepository = getRepository(RideRequest);

  async all(request: Request, response: Response, next: NextFunction) {}

  async add(request: Request, response: Response, next: NextFunction) {}

  async one(request: Request, response: Response, next: NextFunction) {}

  async remove(request: Request, response: Response, next: NextFunction) {}

  async update(request: Request, response: Response, next: NextFunction) {}
}
