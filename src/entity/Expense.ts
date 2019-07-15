import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Attachment } from "./Attachment";
import { Project } from "./Project";
import { User } from "./User";

@Entity("expense")
export class Expense extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  amount: number;

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
