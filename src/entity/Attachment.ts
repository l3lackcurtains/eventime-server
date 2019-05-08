import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("attachment")
export class Attachment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;
}
