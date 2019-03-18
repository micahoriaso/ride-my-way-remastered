import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1552902000240 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "ride_request" ("id" SERIAL NOT NULL, "ride" character varying NOT NULL, "requestor" character varying NOT NULL, "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "rideId" integer, "requestorId" uuid, CONSTRAINT "PK_f5d356576522e43e56a3a0e906b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "ride_status_enum" AS ENUM('IN_OFFER', 'STARTED', 'DONE', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "ride" ("id" SERIAL NOT NULL, "time" character varying NOT NULL, "date" character varying NOT NULL, "pickup" character varying NOT NULL, "dropoff" character varying NOT NULL, "capacity" integer NOT NULL, "seatsAvailable" integer NOT NULL, "price" money NOT NULL, "status" "ride_status_enum" NOT NULL DEFAULT 'IN_OFFER', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "driverId" uuid, CONSTRAINT "PK_f6bc30c4dd875370bafcb54af1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "type" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_31ef2b4d30675d0c15056b7f6e" ON "user"  ("type") `);
        await queryRunner.query(`CREATE INDEX "IDX_1fc048784c8eee24d541511e10" ON "user"  ("id", "type") `);
        await queryRunner.query(`CREATE TABLE "car" ("id" SERIAL NOT NULL, "registration" character varying NOT NULL, "model" character varying NOT NULL, "capacity" integer NOT NULL, "ownerId" uuid, CONSTRAINT "UQ_00a2022fc3be9eaffa88ffbb07e" UNIQUE ("registration"), CONSTRAINT "REL_cce467b67e5d4a0012473f985e" UNIQUE ("ownerId"), CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ride_request" ADD CONSTRAINT "FK_ed9a52a1fb727df792aefac8ac3" FOREIGN KEY ("rideId") REFERENCES "ride"("id")`);
        await queryRunner.query(`ALTER TABLE "ride_request" ADD CONSTRAINT "FK_f8a7bf735e9302a65f42d3ba651" FOREIGN KEY ("requestorId") REFERENCES "user"("id")`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_a212335bd593ecd23b665309e9d" FOREIGN KEY ("driverId") REFERENCES "user"("id")`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_cce467b67e5d4a0012473f985ea" FOREIGN KEY ("ownerId") REFERENCES "user"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_cce467b67e5d4a0012473f985ea"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_a212335bd593ecd23b665309e9d"`);
        await queryRunner.query(`ALTER TABLE "ride_request" DROP CONSTRAINT "FK_f8a7bf735e9302a65f42d3ba651"`);
        await queryRunner.query(`ALTER TABLE "ride_request" DROP CONSTRAINT "FK_ed9a52a1fb727df792aefac8ac3"`);
        await queryRunner.query(`DROP TABLE "car"`);
        await queryRunner.query(`DROP INDEX "IDX_1fc048784c8eee24d541511e10"`);
        await queryRunner.query(`DROP INDEX "IDX_31ef2b4d30675d0c15056b7f6e"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "ride"`);
        await queryRunner.query(`DROP TYPE "ride_status_enum"`);
        await queryRunner.query(`DROP TABLE "ride_request"`);
    }

}
