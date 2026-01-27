import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'cities'})
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ type: 'text' , nullable: true })
    description: string;

    @Column({ type: 'bool', default: true })
    active: boolean;
}
