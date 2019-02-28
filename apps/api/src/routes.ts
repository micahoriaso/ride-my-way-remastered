import { UserController } from './controller/UserController';
import { AuthController } from './controller/AuthController';
import { CarController } from './controller/CarController';
import { RideController } from './controller/RideController';

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
    authenticated: true
  },
  {
    method: 'get',
    route: '/cars/:id',
    controller: CarController,
    action: 'one',
    authenticated: true
  },
  {
    method: 'post',
    route: '/cars',
    controller: CarController,
    action: 'save',
    authenticated: true
  },
  {
    method: 'delete',
    route: '/cars/:id',
    controller: CarController,
    action: 'remove',
    authenticated: true
  },
  {
    method: 'put',
    route: '/cars/:id',
    controller: CarController,
    action: 'update',
    authenticated: true
  },
  {
    method: 'get',
    route: '/rides',
    controller: RideController,
    action: 'all',
    authenticated: true
  },
  {
    method: 'get',
    route: '/rides/:id',
    controller: RideController,
    action: 'one',
    authenticated: true
  },
  {
    method: 'post',
    route: '/rides',
    controller: RideController,
    action: 'save',
    authenticated: true
  },
  {
    method: 'delete',
    route: '/rides/:id',
    controller: RideController,
    action: 'remove',
    authenticated: true
  },
  {
    method: 'put',
    route: '/rides/:id',
    controller: RideController,
    action: 'update',
    authenticated: true
  }
];
