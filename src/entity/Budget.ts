import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

type BudgetType = "money" | "time";

@Entity("budget")
export class Budget extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({
    default: 0
  })
  amount: number;

  @Column({
    default: 0
  })
  progress: number;

  @Column({
    type: "enum",
    enum: ["money", "time"],
    default: "time"
  })
  type: BudgetType;
}
