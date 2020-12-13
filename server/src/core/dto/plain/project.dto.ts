import { DocFolderDTO } from "./doc-folder.dto";
import { PersonDTO } from "./person.dto";
import { TaskDTO } from "./task.dto";

export class ProjectDTO {
    id: number;

    name: string;

    dateCreated: Date;

    description: string;

    docFolders: DocFolderDTO[];

    tasks: TaskDTO[];
    
    persons: PersonDTO[];
}