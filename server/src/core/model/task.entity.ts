import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommentPost } from "./comment-post.entity";
import { User } from "././user.entity";
import { Project } from "./project.entity";

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    verboseName: string;

    @Column()
    type: string;

    @Column()
    description: string;

    @Column()
    status: string;

    @Column()
    priority: number;

    @Column()
    hoursEstimated: number;

    @Column()
    hoursRemaining: number;

    @Column()
    hoursSpent: number;

    @Column({nullable: true})
    gitLink: string;

    @OneToMany(type => CommentPost, commentPost => commentPost.task)
    commentPosts: CommentPost[];
    
    @ManyToOne(type => Project, project => project.tasks, {nullable: false})
    project: Project;

    @ManyToOne(type => User, user => user.tasks)
    user: User;

    @OneToMany(type => Task, childTask => childTask.parentTask)
    childTasks: Task[];

    @ManyToOne(type => Task, parentTask => parentTask.childTasks)
    parentTask: Task;
}