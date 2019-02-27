import { UserController } from './controller/UserController';
import { AuthController } from './controller/AuthController';
import { CarController } from './controller/CarController';

export const Routes = [
  {
    method: 'get',
    route: '/users',
    controller: UserController,
    action: 'all'
  },
  {
    method: 'get',
    route: '/users/:id',
    controller: UserController,
    action: 'one'
  },
  {
    method: 'post',
    route: '/users',
    controller: UserController,
    action: 'save'
  },
  {
    method: 'delete',
    route: '/users/:id',
    controller: UserController,
    action: 'remove'
  },
  {
    method: 'post',
    route: '/auth/signup',
    controller: AuthController,
    action: 'signup'
  },
  {
    method: 'post',
    route: '/auth/login',
    controller: AuthController,
    action: 'login'
  },
  {
    method: 'get',
    route: '/cars',
    controller: CarController,
    action: 'all',
    authenticate: true
  },
  {
    method: 'get',
    route: '/cars/:id',
    controller: CarController,
    action: 'one',
    authenticate: true
  },
  {
    method: 'post',
    route: '/cars',
    controller: CarController,
    action: 'save',
    authenticate: true
  },
  {
    method: 'delete',
    route: '/cars/:id',
    controller: CarController,
    action: 'remove',
    authenticate: true
  },
  {
    method: 'put',
    route: '/cars/:id',
    controller: CarController,
    action: 'update',
    authenticate: true
  }
];
