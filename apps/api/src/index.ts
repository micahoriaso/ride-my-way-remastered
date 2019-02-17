import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Routes } from './routes';
import { handle404 } from './middlewares/404';

createConnection()
  .then(async connection => {
    // create express app
    const app = express();
    const port = process.env.PORT || 5000;
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
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

    // insert new users for test
    // await connection.manager.save(
    //   connection.manager.create(User, {
    //     firstName: "Timber",
    //     lastName: "Saw",
    //     age: 27
    //   })
    // );
    // await connection.manager.save(
    //   connection.manager.create(User, {
    //     firstName: "Phantom",
    //     lastName: "Assassin",
    //     age: 24
    //   })
    // );

    console.log(
      'Express server has started on port 5000. Open http://localhost:5000 to see results'
    );
  })
  .catch(error => console.log(error));
