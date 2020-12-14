import { DocFolderDTO } from "./doc-folder.dto";
import { UserDTO } from "././user.dto";
import { TaskDTO } from "./task.dto";

export class ProjectDTO {
    id: number;

    name: string;

    dateCreated: Date;

    description: string;

    docFolders: DocFolderDTO[];

    tasks: TaskDTO[];
    
    users: UserDTO[];
}