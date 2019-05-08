import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne
} from "typeorm";
import { Task } from "./Task";
import { User } from "./User";

type TimerStatus = "active" | "inactive";

@Entity("timer")
export class Timer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  duration: number;

  @Column()
  today: number;

  @Column()
  startedAt: string;

  @Column()
  userDate: string;

  @Column({ type: "text" })
  details: string;

  @Column({
    type: "enum",
    enum: ["active", "inactive"],
    default: "inactive"
  })
  status: TimerStatus;

  /**
   * Relations
   */

  @OneToOne(type => Task)
  @JoinColumn()
  task: Task;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;
}
