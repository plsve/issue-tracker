import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Language } from "./language.entity";
import { Person } from "./person.entity";

@Entity()
export class Preference {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    theme: string;

    @OneToOne(type => Language, language => language.preference, {nullable: false})
    @JoinColumn()
    language: Language;

    @OneToOne(type => Person, person => person.preference)
    person: Person;
}