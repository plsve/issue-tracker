import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Preference } from "./preference.entity";

@Entity()
export class Language {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Preference, preference => preference.language)
    preferences: Preference;

    constructor(values: Object = {}) {
        Object.assign(this, values);
      }
}