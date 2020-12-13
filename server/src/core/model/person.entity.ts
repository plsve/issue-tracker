import { Permission } from "./permission.entity";
import { Preference } from "./preference.entity";
import { Project } from "./project.entity";
import { Task } from "./task.entity";
import { CommentPost } from "./comment-post.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Person {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;
    
    @Column({select: false})
    password: string;
    
    @Column()
    name: string;
    
    @Column()
    surname: string;
    
    @Column({nullable: true})
    photo: string;

    @ManyToMany(type => Project, project => project.persons)
    projects: Project[];

    @OneToMany(type => Task, task => task.person)
    tasks: Task[];

    @OneToMany(type => CommentPost, commentPost => commentPost.person)
    commentPosts: CommentPost[];

    @ManyToMany(type => Permission, permission => permission.persons)
    @JoinTable({
        name: "person_has_permission"
    })
    permissions: Permission[]

    @OneToOne(type => Preference, preference => preference.person, {nullable: false})
    @JoinColumn()
    preference: Preference;
    
}