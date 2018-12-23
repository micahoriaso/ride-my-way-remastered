import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export class UserController {
  private userRepository = getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      return await this.userRepository.find();
    } catch (error) {
      return error;
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      const user = await this.userRepository.findOne(request.params.id);
      if (!user) {
        response.status(404);
        response.send({ message: "Sorry, user not found!" });
        response.end();
        return;
      }
      return user;
    } catch (error) {
      if (error.name === "QueryFailedError") {
        response.status(500);
        response.send({
          message:
            "Sorry, there was a problem with the database. Please contact the system administrator"
        });
        response.end();
      }
      return error;
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      await this.userRepository.save(request.body);
      response.status(201);
      response.end();
    } catch (error) {
      return error;
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const userToRemove = await this.userRepository.findOne(request.params.id);
    if (!userToRemove) {
      response.status(404);
      response.end();
      return;
    }
    try {
      await this.userRepository.remove(userToRemove);
      return "User deleted";
    } catch (error) {
      return error;
    }
  }
}
