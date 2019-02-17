import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import jwt from 'jsonwebtoken';
import { formatResponse } from '../helpers';
import { Login } from '../validators/login';

interface iPayload {
  email: string;
}
interface iSignOptions {
  expiresIn: string;
  algorithm: string;
}

const encodeJWT = (
  payload: iPayload,
  privateKEY: string,
  signOptions: iSignOptions
): string => {
  return jwt.sign(payload, privateKEY, signOptions);
};

export class AuthController {
  private userRepository = getRepository(User);

  async login(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;
    let loginObject = new Login();
    loginObject.email = email;
    loginObject.password = password;
    const errors = await validate(loginObject, {
      validationError: { target: false },
      skipMissingProperties: false
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
      try {
        const user = await this.userRepository.findOne({ email });
        if (!user) {
          return formatResponse({
            status: 404,
            data: { message: 'Sorry, user not found!' },
            response
          });
        } else {
          const match = await bcrypt.compare(password, user.password);
          if (match) {
            const payload = { email };
            const signOptions = {
              expiresIn: '12h',
              algorithm: 'HS256'
            };
            const privateKEY = process.env.PRIVATE_KEY;
            const token = encodeJWT(payload, privateKEY, signOptions);
            return formatResponse({
              status: 200,
              data: {
                message: `Welcome back, ${user.first_name} ${user.last_name}`,
                token
              },
              response
            });
          } else {
            return formatResponse({
              status: 400,
              data: { message: 'Invalid password' },
              response
            });
          }
        }
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
  }

  async signup(request: Request, response: Response, next: NextFunction) {
    const { body } = request;
    let user = new User();
    let userRepository = getRepository(User);
    user.email = body.email;
    user.first_name = body.first_name || null;
    user.last_name = body.last_name || null;
    user.password = body.password;
    user.phone = body.phone;
    try {
      const errors = await validate(user, {
        validationError: { target: false }
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
        await userRepository.save(user);
        return formatResponse({
          status: 201,
          data: {
            message: 'Yaay! Welcome aboard'
          },
          response
        });
      }
    } catch (error) {
      return error;
    }
  }
}
