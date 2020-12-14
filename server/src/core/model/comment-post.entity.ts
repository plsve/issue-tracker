import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "././user.entity";
import { Task } from "./task.entity";

@Entity()
export class CommentPost {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.commentPosts, {nullable: false})
    user: User;

    @ManyToOne(type => Task, task => task.commentPosts, {nullable: false})
    task: Task;

    @Column()
    dateCreated: Date;
    
    @Column()
    content: string;
}