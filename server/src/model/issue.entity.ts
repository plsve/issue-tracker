import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommentPost } from "./comment-post.entity";
import { User } from "./user.entity";
import { Project } from "./project.entity";
import { WorkHourScale } from "src/constant/work-hour-scale.const";

@Entity()
export class Issue {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    verboseName: string;

    @Column()
    type: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    status: string;

    @Column()
    priority: number;

    @Column()
    created: Date;

    @Column({ nullable: true })
    edited: Date;
    
    @Column({ nullable: true })
    resolved: Date;

    @Column({ nullable: true, type: 'decimal', ...WorkHourScale})
    hoursEstimated: number;

    @Column({ nullable: true, type: 'decimal', ...WorkHourScale})
    hoursRemaining: number;

    @Column({ nullable: true, type: 'decimal', ...WorkHourScale})
    hoursSpent: number;

    @Column({ nullable: true })
    gitLink: string;

    @ManyToOne(type => User, user => user.createdIssues, { nullable: false })
    createdByUser: User;

    @ManyToOne(type => User, user => user.editedIssues)
    editedByUser: User;

    @OneToMany(type => CommentPost, commentPost => commentPost.issue)
    commentPosts: CommentPost[];

    @ManyToOne(type => Project, project => project.issues, { nullable: false })
    project: Project;

    @ManyToOne(type => User, user => user.issues)
    user: User;

    @OneToMany(type => Issue, childIssue => childIssue.parentIssue)
    childIssues: Issue[];

    @ManyToOne(type => Issue, parentIssue => parentIssue.childIssues)
    parentIssue: Issue;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}