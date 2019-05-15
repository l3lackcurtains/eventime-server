import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

type BudgetType = "money" | "time";

@Entity("budget1")
export class Budget extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  amount: number;

  @Column({
    type: "enum",
    enum: ["money", "time"],
    default: "money"
  })
  type: BudgetType;

  @Column()
  progress: number;
}
