import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany
} from "typeorm";
import { Project } from "./Project";
import { Task } from "./Task";

@Entity("section")
export class Section extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  /**
   * Relations
   */
  @ManyToOne(type => Project, project => project.sections)
  project: Project;

  @OneToMany(type => Task, task => task.section)
  tasks: Task[];
}
