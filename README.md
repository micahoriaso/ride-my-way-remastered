# Ride-My-Way

Ride-My-Way App is a carpooling application that provides drivers with the ability to create ride offers and passengers to join available ride offers.

## Installation

- \$ git clone https://github.com/micahoriaso/ride-my-way-remastered.git
- \$ cd ride-my-way-remastered
- \$ yarn install
- \$ yarn install:all
- \$ yarn start

## Migrations

### Runnning migrations

- \$ cd apps/api
- \$ yarn migrate:run

### Generating migrations

- \$ yarn migrate:generate -n <migration_name>

### Creating migrations

- \$ yarn migrate:create

### Reverting migrations

- \$ yarn migrate:revert
