import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Section } from "./Section";
import { Timer } from "./Timer";
import { TimerRecord } from "./TimerRecord";

type TaskStatus = "open" | "closed";

@Entity("task")
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  position: number;

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

  @OneToMany(type => Timer, timer => timer.task)
  timers: [Timer];

  @OneToMany(type => TimerRecord, timerRecord => timerRecord.task)
  timerRecords: [TimerRecord];
}
