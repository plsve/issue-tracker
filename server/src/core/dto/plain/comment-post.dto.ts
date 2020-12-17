import { UserDTO } from "././user.dto";
import { IssueDTO } from "./issue.dto";

export class CommentPostDTO {
    id: number;

    user: UserDTO;

    issue: IssueDTO;

    dateCreated: Date;
    
    content: string;
}