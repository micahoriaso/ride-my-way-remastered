import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance
} from "typeorm";

@Entity()
@TableInheritance({
  column: { name: "type", type: "varchar" }
})
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  first_name?: string;

  @Column({ nullable: true })
  last_name?: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;
}
