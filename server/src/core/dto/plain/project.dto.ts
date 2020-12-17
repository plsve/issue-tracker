import { DocFolderDTO } from "./doc-folder.dto";
import { UserDTO } from "././user.dto";
import { IssueDTO } from "./issue.dto";

export class ProjectDTO {
    id: number;

    name: string;

    dateCreated: Date;

    description: string;

    docFolders: DocFolderDTO[];

    issues: IssueDTO[];
    
    users: UserDTO[];
}