import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne
} from "typeorm";
import { Section } from "./Section";

type TaskStatus = "open" | "closed";

@Entity("task")
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column()
  dueAt: string;

  @Column({
    type: "enum",
    enum: ["open", "closed"],
    default: "open"
  })
  status: TaskStatus;

  /**
   * Relations
   */
  @ManyToOne(type => Section, section => section.tasks)
  section: Section;
}
