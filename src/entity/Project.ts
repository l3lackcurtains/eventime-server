import slugify from "slugify";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Billing } from "./Billing";
import { Budget } from "./Budget";
import { Client } from "./Client";
import { Invoice } from "./Invoice";
import { Section } from "./Section";
import { User } from "./User";
@Entity("project")
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: String;

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

  @BeforeUpdate()
  @BeforeInsert()
  async updateSlug() {
    if (this.name) {
      const name =
        this.name + "-" + Math.floor(Math.random() * Math.floor(100000000));
      this.slug = slugify(name, {
        lower: true
      });
    }
  }
}
