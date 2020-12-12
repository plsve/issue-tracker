import { Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Person } from "./person.entity";

@Entity()
export class Permission {

    @PrimaryColumn()
    id: string

    @ManyToMany(type => Person, person => person.permissions)
    persons: Person[];
}