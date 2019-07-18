import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Attachment } from "./Attachment";
import { Project } from "./Project";
import { User } from "./User";

type ExpenseCategory =
  | "transportation"
  | "infrastructure"
  | "meal"
  | "officeNeed"
  | "service"
  | "others";

@Entity("expense")
export class Expense extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  amount: number;

  @Column({ default: true })
  billable: boolean;

  @Column({
    type: "enum",
    enum: [
      "transportation",
      "infrastructure",
      "meal",
      "officeNeed",
      "service",
      "others"
    ],
    default: ""
  })
  @Column()
  category: ExpenseCategory;

  @Column()
  date: string;

  @Column({ type: "text" })
  details: string;

  /**
   * Relations
   */

  @ManyToOne(type => Project)
  @JoinColumn()
  project: Project;

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;

  @ManyToMany(type => Attachment)
  @JoinTable()
  attachments: Attachment[];
}
