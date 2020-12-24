import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Issue } from "./issue.entity";
import { WorkHourScale } from "src/constant/work-hour-scale.const";

@Entity()
export class CommentPost {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.commentPosts, { nullable: false, eager: true })
    user: User;

    @ManyToOne(type => Issue, issue => issue.commentPosts, { nullable: false, onDelete: 'CASCADE' })
    issue: Issue;

    @Column()
    created: Date;

    @Column({ nullable: true })
    edited: Date;

    @Column({nullable: true})
    content: string;
    
    @Column({nullable: true, type: 'decimal', ...WorkHourScale})
    workedHours: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}