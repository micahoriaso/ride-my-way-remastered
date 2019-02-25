import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';
import { formatResponse } from '../helpers';
import { validate } from 'class-validator';

export class UserController {
  private userRepository = getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      const users = await this.userRepository.find();
      return formatResponse({ status: 200, data: users, response });
    } catch (error) {
      return error;
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      const user = await this.userRepository.findOne(request.params.id);
      if (!user) {
        response.status(404);
        response.send({ message: 'Sorry, user not found!' });
        return;
      }
      return formatResponse({ status: 200, data: user, response });
    } catch (error) {
      if (error.name === 'QueryFailedError') {
        response.status(500);
        response.send({
          message:
            'Sorry, there was a problem with the database. Please contact the system administrator'
        });
      }
      return error;
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      await this.userRepository.save(request.body);
      return formatResponse({ status: 201, data: 'User created', response });
    } catch (error) {
      return error;
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const userToRemove = await this.userRepository.findOne(request.params.id);
    if (!userToRemove) {
      return formatResponse({ status: 404, error: 'User not found', response });
    }
    try {
      await this.userRepository.remove(userToRemove);
      return formatResponse({ status: 200, data: 'User deleted', response });
    } catch (error) {
      return error;
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const { body } = request;
    const userToUpdate = await this.userRepository.findOne(request.params.id);
    userToUpdate.first_name = body.first_name;
    userToUpdate.last_name = body.last_name;
    userToUpdate.email = body.email;
    try {
      const errors = await validate(userToUpdate, {
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
        await this.userRepository.save(userToUpdate);
        return formatResponse({ status: 201, data: 'User updated', response });
      }
    } catch (error) {
      return error;
    }
  }
}
