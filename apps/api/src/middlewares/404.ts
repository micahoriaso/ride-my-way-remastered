import { NextFunction, Request, Response } from 'express';

export function handle404(
  request: Request,
  response: Response,
  next: NextFunction
) {
  response.status(404);
  response.send({ status: 404, data: 'Resource not found!' });
}
