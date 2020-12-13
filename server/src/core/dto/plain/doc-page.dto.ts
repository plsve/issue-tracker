import { DocFolderDTO } from "./doc-folder.dto";

export class DocPageDTO {
    id: number;

    title: string;
    
    content: string;

    docFolder: DocFolderDTO;
}