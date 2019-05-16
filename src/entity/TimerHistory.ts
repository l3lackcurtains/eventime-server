import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne,
  ManyToOne
} from "typeorm";
import { User } from "./User";
import { TimerRecord } from "./TimerRecord";

type TimerAction = "timer" | "added";

@Entity("timer_history")
export class TimerHistory extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  time: number;

  @Column()
  previousTime: number;

  @Column()
  createdAt: string;

  @Column({
    type: "enum",
    enum: ["timer", "added"],
    default: "timer"
  })
  status: TimerAction;

  /**
   * Relations
   */

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;

  @ManyToOne(type => TimerRecord, timerRecord => timerRecord.history)
  timerRecord: TimerRecord;
}
