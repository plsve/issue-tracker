import { UserDTO } from "././user.dto";
import { TaskDTO } from "./task.dto";

export class CommentPostDTO {
    id: number;

    user: UserDTO;

    task: TaskDTO;

    dateCreated: Date;
    
    content: string;
}