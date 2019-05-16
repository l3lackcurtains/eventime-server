import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToOne,
  OneToMany
} from "typeorm";
import { Section } from "./Section";
import { TaskTime } from "./TaskTime";
import { Timer } from "./Timer";

type TaskStatus = "open" | "closed";

@Entity("task")
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
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

  @OneToOne(type => TaskTime)
  time: TaskTime;

  @OneToMany(type => Timer, timer => timer.task)
  timers: [Timer];
}
