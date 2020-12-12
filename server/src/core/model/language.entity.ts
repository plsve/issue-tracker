import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Preference } from "./preference.entity";

@Entity()
export class Language {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(type => Preference, preference => preference.language)
    preference: Preference;
}