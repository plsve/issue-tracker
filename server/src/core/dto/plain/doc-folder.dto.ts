import { DocPageDTO } from "./doc-page.dto";
import { ProjectDTO } from "./project.dto";

export class DocFolderDTO {
    id: number;

    name: string;

    project: ProjectDTO;

    docPages: DocPageDTO[];
    
    childDocFolders: DocFolderDTO[];

    parentDocFolder: DocFolderDTO;
}