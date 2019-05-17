import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne,
  ManyToOne
} from "typeorm";
import { Task } from "./Task";
import { User } from "./User";

type TimerStatus = "active" | "inactive";

@Entity("timer")
export class Timer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  startedAt: string;

  /**
   * Relations
   */
  @ManyToOne(type => Task, task => task.timers)
  @JoinColumn()
  task: Task;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;
}
