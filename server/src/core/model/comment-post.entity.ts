import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./person.entity";
import { Task } from "./task.entity";

@Entity()
export class CommentPost {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Person, person => person.commentPosts, {nullable: false})
    person: Person;

    @ManyToOne(type => Task, task => task.commentPosts, {nullable: false})
    task: Task;

    @Column()
    dateCreated: Date;
    
    @Column()
    content: string;
}