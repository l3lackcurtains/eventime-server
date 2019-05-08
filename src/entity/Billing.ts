import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable
} from "typeorm";
import { User } from "./User";

type BillingType = "flat_rate" | "user_rate";

@Entity("billing")
export class Billing extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  rate: number;

  @Column({
    type: "enum",
    enum: ["flat_rate", "user_rate"],
    default: "flat_rate"
  })
  type: BillingType;

  @ManyToMany(type => User)
  @JoinTable()
  users: User[];
}
