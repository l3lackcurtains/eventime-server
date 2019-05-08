import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne,
  JoinTable,
  OneToMany
} from "typeorm";
import { User } from "./User";
import { Client } from "./Client";
import { Project } from "./Project";
import { Discount } from "./Discount";
import { InvoiceItem } from "./InvoiceItem";
import { Tax } from "./Tax";

type InvoiceStatus = "draft" | "sent" | "paid";

@Entity("invoice")
export class Invoice extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  createdAt: string;

  @Column()
  dateFrom: string;

  @Column()
  dateTill: string;

  @Column()
  dueDate: string;

  @Column()
  issueDate: string;

  @Column()
  limitDateFrom: string;

  @Column()
  limitDateTill: string;

  @Column()
  listAmount: number;

  @Column()
  netAmount: number;

  @Column({ default: true })
  includeExpenses: boolean;

  @Column({ default: true })
  includeTime: boolean;

  @Column()
  totalAmount: number;

  @Column()
  totalTime: number;

  @Column({
    type: "enum",
    enum: ["draft", "sent", "paid"],
    default: "draft"
  })
  status: InvoiceStatus;

  /**
   * Relations
   */

  @OneToOne(type => Client)
  @JoinColumn()
  client: Client;

  @OneToOne(type => User)
  @JoinColumn()
  createdBy: User;

  @OneToOne(type => Discount)
  @JoinColumn()
  discount: Discount;

  @OneToOne(type => Discount)
  @JoinColumn()
  tax: Tax;

  @OneToMany(type => Project, project => project.invoice)
  @JoinTable()
  projects: Project[];

  @OneToMany(type => InvoiceItem, invoiceItem => invoiceItem.invoice)
  @JoinTable()
  invoiceItems: InvoiceItem[];
}
