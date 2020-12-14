import { Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { User } from "././user.entity";

@Entity()
export class Permission {

    @PrimaryColumn()
    id: string

    @ManyToMany(type => User, user => user.permissions)
    users: User[];
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
      }
}