import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany
} from "typeorm";
import { User } from "./User";
import { Budget } from "./Budget";
import { Billing } from "./Billing";
import { Section } from "./Section";
import { Client } from "./Client";
import { Invoice } from "./Invoice";

@Entity("project")
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  /**
   * Relations
   */
  @ManyToMany(type => User)
  @JoinTable()
  users: User[];

  @ManyToOne(type => User)
  @JoinColumn()
  client: Client;

  @OneToOne(type => Budget)
  @JoinColumn()
  budget: Budget;

  @OneToOne(type => Billing)
  @JoinColumn()
  billing: Billing;

  @OneToMany(type => Section, section => section.project)
  sections: Section[];

  @ManyToOne(type => Invoice, invoice => invoice.projects)
  invoice: Invoice;
}
