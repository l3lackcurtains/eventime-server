import * as bcrypt from "bcryptjs";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

type UserRole = "admin" | "manager" | "employee";
type UserStatus = "active" | "invited" | "pending" | "removed";

@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "text" })
  password: string;

  @Column()
  avatar: string;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: ["admin", "manager", "employee"],
    default: "admin"
  })
  role: UserRole;

  @Column({
    type: "enum",
    enum: ["active", "invited", "pending", "removed"],
    default: "active"
  })
  status: UserStatus;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
