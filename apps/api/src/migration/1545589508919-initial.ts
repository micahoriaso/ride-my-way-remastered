import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1545589508919 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "car" ("id" character varying NOT NULL, "model" character varying NOT NULL, "capacity" integer NOT NULL, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying, "last_name" character varying, "email" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "car" character varying, "type" character varying NOT NULL, "carId" character varying, CONSTRAINT "REL_bf812cb2c6baba866991d9781c" UNIQUE ("carId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_31ef2b4d30675d0c15056b7f6e" ON "user"  ("type") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1fc048784c8eee24d541511e10" ON "user"  ("id", "type") `
    );
    await queryRunner.query(
      `CREATE TABLE "ride_request" ("id" SERIAL NOT NULL, "ride" character varying NOT NULL, "requestor" character varying NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "rideId" integer, "requestorId" uuid, CONSTRAINT "PK_f5d356576522e43e56a3a0e906b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "ride" ("id" SERIAL NOT NULL, "time" character varying NOT NULL, "date" character varying NOT NULL, "pickup" character varying NOT NULL, "dropoff" character varying NOT NULL, "capacity" integer NOT NULL, "seats_available" integer NOT NULL, "driver" character varying NOT NULL, "price" money NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "driverId" uuid, CONSTRAINT "PK_f6bc30c4dd875370bafcb54af1b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_bf812cb2c6baba866991d9781c7" FOREIGN KEY ("carId") REFERENCES "car"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "ride_request" ADD CONSTRAINT "FK_ed9a52a1fb727df792aefac8ac3" FOREIGN KEY ("rideId") REFERENCES "ride"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "ride_request" ADD CONSTRAINT "FK_f8a7bf735e9302a65f42d3ba651" FOREIGN KEY ("requestorId") REFERENCES "user"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "ride" ADD CONSTRAINT "FK_a212335bd593ecd23b665309e9d" FOREIGN KEY ("driverId") REFERENCES "user"("id")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "ride" DROP CONSTRAINT "FK_a212335bd593ecd23b665309e9d"`
    );
    await queryRunner.query(
      `ALTER TABLE "ride_request" DROP CONSTRAINT "FK_f8a7bf735e9302a65f42d3ba651"`
    );
    await queryRunner.query(
      `ALTER TABLE "ride_request" DROP CONSTRAINT "FK_ed9a52a1fb727df792aefac8ac3"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_bf812cb2c6baba866991d9781c7"`
    );
    await queryRunner.query(`DROP TABLE "ride"`);
    await queryRunner.query(`DROP TABLE "ride_request"`);
    await queryRunner.query(`DROP INDEX "IDX_1fc048784c8eee24d541511e10"`);
    await queryRunner.query(`DROP INDEX "IDX_31ef2b4d30675d0c15056b7f6e"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "car"`);
  }
}