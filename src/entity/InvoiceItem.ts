import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinTable,
  ManyToOne
} from "typeorm";
import { Invoice } from "./Invoice";

@Entity("invoice_item")
export class InvoiceItem extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  createdAt: string;

  @Column({ default: false })
  custom: boolean;

  @Column()
  billedTime: number;

  @Column()
  listAmount: number;

  @Column()
  name: string;

  @Column()
  netAmount: number;

  @Column()
  totalAmount: number;

  @Column({ default: true })
  taxable: boolean;

  /**
   * Relations
   */

  @ManyToOne(type => Invoice, invoice => invoice.invoiceItems)
  @JoinTable()
  invoice: Invoice;
}
