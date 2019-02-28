import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { NextFunction, Request, Response, RequestHandler } from 'express';
import { formatResponse } from '../helpers';
import { User } from '../entity/User';

export interface Authenticated {
  decoded: any;
}

export const signJWT = (email: string): string => {
  const payload = { email };
  const privateKEY = process.env.PRIVATE_KEY;
  const signOptions = {
    expiresIn: '12h',
    algorithm: 'HS256'
  };
  return jwt.sign(payload, privateKEY, signOptions);
};

export const verifyJWT = (token: string) => {
  const publicKEY = process.env.PUBLIC_KEY;
  try {
    return jwt.verify(token, publicKEY);
  } catch (error) {
    return false;
  }
};

export const decodeJWT = (token: string, response: Response) => {
  try {
    return jwt.decode(token, { complete: true });
  } catch (error) {
    return formatResponse({
      status: 401,
      data: { message: 'Sorry, you dont have permission for this resource' },
      response
    });
  }
};

export const checkJWT: RequestHandler = (
  request: Request & Authenticated,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization;

  if (token) {
    const tokenArray = token.split(' ');
    request.decoded = decodeJWT(tokenArray[1], response);
    next();
  } else {
    return formatResponse({
      status: 401,
      data: { message: 'Sorry, auth token is not supplied' },
      response
    });
  }
};

export const passMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
};

export const getCurrentUser: any = async (decodedToken: any) => {
  const user = getRepository(User);
  const currentUser = await user.findOne({
    email: decodedToken.payload.email
  });
  return currentUser;
};
