import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  JoinColumn
} from "typeorm";
import { TaskTimeUser } from "./TaskTimeUser";

@Entity("task_time")
export class TaskTime extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  total: number;

  /**
   * Relations
   */
  @OneToMany(type => TaskTimeUser, taskTimeUser => taskTimeUser.user)
  @JoinColumn()
  taskTimeUsers: TaskTimeUser[];
}
