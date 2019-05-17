import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { Task } from "./Task";
import { User } from "./User";

type RecordType = "timer" | "added";

@Entity("timer_record")
export class TimerRecord extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  date: string;

  @Column()
  duration: number;

  @Column({ nullable: true })
  startedAt: string;

  @Column({ nullable: true })
  stoppedAt: string;

  @Column({
    type: "enum",
    enum: ["timer", "added"],
    default: "timer"
  })
  type: RecordType;

  @Column({ type: "text", nullable: true })
  description: string;

  /**
   * Relations
   */

  @ManyToOne(type => Task)
  @JoinColumn()
  task: Task;

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;
}
