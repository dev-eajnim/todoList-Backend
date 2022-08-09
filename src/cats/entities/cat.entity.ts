import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cat {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 40 })
    name: string

    @Column({ type: 'tinyint' })
    age: number

    @Column({ length: 10 })
    color: string

    @Column()
    breed: string
    
    @Column()
    done: boolean
}
