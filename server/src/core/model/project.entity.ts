import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { DocFolder } from "./doc-folder.entity";
import { User } from "././user.entity";
import { Issue } from "./issue.entity";

@Entity()
export class Project {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;
    
    @Column({unique: true})
    prefix: string;

    @Column()
    dateCreated: Date;

    @Column()
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
}