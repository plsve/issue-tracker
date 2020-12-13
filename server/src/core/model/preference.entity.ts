import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Language } from "./language.entity";
import { Person } from "./person.entity";

@Entity()
export class Preference {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    theme: string;

    @ManyToOne(type => Language, language => language.preferences, {nullable: false})
    language: Language;

    @OneToOne(type => Person, person => person.preference)
    person: Person;
}