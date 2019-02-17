import { NextFunction, Request, Response } from 'express';
interface iOpts {
  status: number;
  data?: any;
  error?: any;
  response: Response;
}
export function formatResponse(opts: iOpts) {
  const { status, data, error, response } = opts;
  response.status(status);
  error ? response.send({ status, error }) : response.send({ status, data });
}
