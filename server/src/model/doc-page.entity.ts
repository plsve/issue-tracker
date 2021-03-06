import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DocFolder } from "./doc-folder.entity";
import { User } from "./user.entity";

@Entity()
export class DocPage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    content: string;

    @Column()
    created: Date;

    @Column({ nullable: true })
    edited: Date;

    @ManyToOne(type => DocFolder, docFolder => docFolder.docPages, { nullable: false, onDelete: 'CASCADE' })
    docFolder: DocFolder;

    @ManyToOne(type => User, user => user.createdDocPages, { nullable: false })
    createdByUser: User;

    @ManyToOne(type => User, user => user.editedDocPages)
    editedByUser: User;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}