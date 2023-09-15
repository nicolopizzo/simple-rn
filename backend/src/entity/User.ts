import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryColumn()
    username: string

    @Column()
    password: string

    @Column()
    role: string

    @Column("simple-array", { nullable: true })
    interests: string[]

}
