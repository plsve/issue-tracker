import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Issue } from "./issue.entity";

@Entity()
export class CommentPost {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.commentPosts, { nullable: false, eager: true })
    user: User;

    @ManyToOne(type => Issue, issue => issue.commentPosts, { nullable: false })
    issue: Issue;

    @Column()
    dateCreated: Date;

    @Column({ nullable: true })
    dateEdited: Date;

    @Column()
    content: string;
}