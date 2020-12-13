import { PersonDTO } from "./person.dto";
import { TaskDTO } from "./task.dto";

export class CommentPostDTO {
    id: number;

    person: PersonDTO;

    task: TaskDTO;

    dateCreated: Date;
    
    content: string;
}