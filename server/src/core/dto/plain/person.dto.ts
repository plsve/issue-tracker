import { CommentPostDTO } from "./comment-post.dto";
import { PermissionDTO } from "./permission.dto";
import { PreferenceDTO } from "./preference.dto";
import { ProjectDTO } from "./project.dto";
import { TaskDTO } from "./task.dto";

export class PersonDTO {
    
    id: number;

    username: string;
    
    password: string;
    
    name: string;
    
    surname: string;
    
    photo: string;

    projects: ProjectDTO[];

    tasks: TaskDTO[];

    commentPosts: CommentPostDTO[];

    permissions: PermissionDTO[]


    preference: PreferenceDTO;
}