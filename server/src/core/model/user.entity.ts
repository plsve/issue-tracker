import { Permission } from "./permission.entity";
import { Preference } from "./preference.entity";
import { Project } from "./project.entity";
import { Issue } from "./issue.entity";
import { CommentPost } from "./comment-post.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;
    
    @Column()
    password: string;
    
    @Column()
    name: string;
    
    @Column()
    surname: string;
    
    @Column({nullable: true})
    photo: string;

    @ManyToMany(type => Project, project => project.users)
    projects: Project[];

    @OneToMany(type => Issue, issue => issue.user)
    issues: Issue[];

    @OneToMany(type => CommentPost, commentPost => commentPost.user)
    commentPosts: CommentPost[];

    @ManyToMany(type => Permission, permission => permission.users)
    @JoinTable({
        name: "user_has_permission"
    })
    permissions: Permission[];

    @OneToOne(type => Preference, preference => preference.user, {nullable: false, cascade: true})
    @JoinColumn()
    preference: Preference;

    constructor(values: Object = {}) {
        Object.assign(this, values);
      }
    
}