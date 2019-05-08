import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne,
  OneToMany
} from "typeorm";
import { Budget } from "./Budget";
import { Project } from "./Project";

@Entity("client")
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column({ type: "text" })
  details: string;

  /**
   * Relations
   */

  @OneToMany(type => Project, project => project.client)
  projects: Project[];

  @OneToOne(type => Budget)
  @JoinColumn()
  budget: Budget;
}
