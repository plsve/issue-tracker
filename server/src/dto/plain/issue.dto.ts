import { CommentPostDTO } from "./comment-post.dto";
import { UserDTO } from "./user.dto";
import { ProjectDTO } from "./project.dto";

export class IssueDTO {
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

    user: UserDTO;

    childIssues: IssueDTO[];

    parentIssue: IssueDTO;
}