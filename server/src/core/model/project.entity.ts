import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DocFolder } from "./doc-folder.entity";
import { Person } from "./person.entity";
import { Task } from "./task.entity";

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    dateCreated: Date;

    @Column()
    description: string;

    @OneToMany(type => DocFolder, docFolder => docFolder.project)
    docFolders: DocFolder[];

    @OneToMany(type => Task, task => task.project)
    tasks: Task[];
    
    @ManyToMany(type => Person, person => person.projects)
    @JoinTable({
        name: "project_utilizes_person"
    })
    persons: Person[];
}