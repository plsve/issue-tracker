import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DocPage } from "./doc-page.entity";
import { Project } from "./project.entity";

@Entity()
export class DocFolder {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => Project, project => project.docFolders, {nullable: false, onDelete: 'CASCADE'})
    project: Project;

    @OneToMany(type => DocPage, docPage => docPage.docFolder)
    docPages: DocPage[];
    
    @OneToMany(type => DocFolder, childDocFolder => childDocFolder.parentDocFolder)
    childDocFolders: DocFolder[];

    @ManyToOne(type => DocFolder, parentDocFolder => parentDocFolder.childDocFolders)
    parentDocFolder: DocFolder;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}