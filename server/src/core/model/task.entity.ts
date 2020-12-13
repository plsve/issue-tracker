import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommentPost } from "./comment-post.entity";
import { Person } from "./person.entity";
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

    @ManyToOne(type => Person, person => person.tasks)
    person: Person;

    @OneToMany(type => Task, childTask => childTask.parentTask)
    childTasks: Task[];

    @ManyToOne(type => Task, parentTask => parentTask.childTasks)
    parentTask: Task;
}