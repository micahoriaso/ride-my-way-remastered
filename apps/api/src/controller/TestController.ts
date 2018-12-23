import { NextFunction, Request, Response } from "express";

export class TestController {
  async all(request: Request, response: Response, next: NextFunction) {
    response.send({
      express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT"
    });
  }
}
