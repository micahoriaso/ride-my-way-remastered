import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { Routes } from './routes';
import { handle404 } from './middlewares/404';
import { checkJWT, passMiddleware } from './services/jwt';

createConnection()
  .then(async connection => {
    // create express app
    const app = express();
    const port = process.env.PORT || 5000;
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // register express routes from defined application routes
    Routes.forEach(route => {
      (app as any)[route.method](
        route.route,
        route.authenticate ? checkJWT : passMiddleware,
        (req: Request, res: Response, next: NextFunction) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then(result =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // setup express app here
    // ...

    // apply middlewares
    app.use(handle404);
    // start express server
    app.listen(port);

    console.log(
      'Express server has started on port 5000. Open http://localhost:5000 to see results'
    );
  })
  .catch(error => console.log(error));
