import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { DocFolder } from "./doc-folder.entity";
import { User } from "./user.entity";
import { Issue } from "./issue.entity";

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;
    
    @Column({unique: true, length: 4 })
    prefix: string;

    @Column()
    created: Date;

    @Column({nullable: true})
    description: string;

    @OneToMany(type => DocFolder, docFolder => docFolder.project)
    docFolders: DocFolder[];

    @OneToMany(type => Issue, issue => issue.project)
    issues: Issue[];
    
    @ManyToMany(type => User, user => user.projects)
    @JoinTable({
        name: "project_utilizes_user"
    })
    users: User[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}