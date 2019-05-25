import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("task_estimate")
export class TaskEstimate extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({
    default: 0
  })
  total: number;
}
