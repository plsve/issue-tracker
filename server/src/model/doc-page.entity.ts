import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DocFolder } from "./doc-folder.entity";

@Entity()
export class DocPage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    
    @Column()
    content: string;

    @ManyToOne(type => DocFolder, docFolder => docFolder.docPages, {nullable: false})
    docFolder: DocFolder;
}