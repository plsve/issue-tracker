import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Language } from "./language.entity";
import { User } from "./user.entity";

@Entity()
export class Preference {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    theme: string;

    @ManyToOne(type => Language, language => language.preferences, {nullable: false})
    language: Language;

    @OneToOne(type => User, user => user.preference)
    user: User;
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
      }
}