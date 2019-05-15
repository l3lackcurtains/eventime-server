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

@Entity("timer_record")
export class TimerRecord extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  time: number;

  @Column()
  date: string;

  @Column({ default: false })
  locked: boolean;

  @Column({ default: false })
  invoiced: boolean;

  @Column({ type: "text" })
  details: string;

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
