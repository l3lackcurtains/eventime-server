import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Project } from "./Project";
import { Task } from "./Task";

@Entity("section")
export class Section extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column()
  position: number;

  /**
   * Relations
   */
  @ManyToOne(type => Project, project => project.sections)
  project: Project;

  @OneToMany(type => Task, task => task.section, {
    cascade: true
  })
  tasks: Task[];
}
