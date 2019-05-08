import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { User } from "./User";
import { TaskTime } from "./TaskTime";

@Entity("task_time_user")
export class TaskTimeUser extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  total: number;

  /**
   * Relations
   */
  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  @ManyToOne(type => TaskTime, taskTime => taskTime.taskTimeUsers)
  taskTime: TaskTime;
}
