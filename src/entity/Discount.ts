import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne
} from "typeorm";
import { Invoice } from "./Invoice";

@Entity("discount")
export class Discount extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  amount: number;

  @Column()
  rate: number;

  /**
   * Relations
   */

  @OneToOne(type => Invoice)
  @JoinColumn()
  invoice: Invoice;
}
