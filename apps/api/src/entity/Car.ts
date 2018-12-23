import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  model: string;

  @Column()
  capacity: number;
}
