import { CommentPostDTO } from "./comment-post.dto";
import { PersonDTO } from "./person.dto";
import { ProjectDTO } from "./project.dto";

export class TaskDTO {
    id: number;

    name: string;

    verboseName: string;

    type: string;

    description: string;

    status: string;

    priority: number;

    hoursEstimated: number;

    hoursRemaining: number;

    hoursSpent: number;

    gitLink: string;

    commentPosts: CommentPostDTO[];
    
    project: ProjectDTO;

    person: PersonDTO;

    childTasks: TaskDTO[];

    parentTask: TaskDTO;
}