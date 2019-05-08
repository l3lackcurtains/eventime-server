import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable
} from "typeorm";
import { User } from "./User";
import { Project } from "./Project";
import { Attachment } from "./Attachment";

@Entity("expense")
export class Expense extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  amount: number;

  @Column()
  quantity: number;

  @Column()
  netAmount: number;

  @Column({ default: true })
  billable: boolean;

  @Column()
  category: string;

  @Column()
  date: string;

  @Column({ type: "text" })
  details: string;

  /**
   * Relations
   */

  @OneToOne(type => Project)
  @JoinColumn()
  project: Project;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  @ManyToMany(type => Attachment)
  @JoinTable()
  attachments: Attachment[];
}
