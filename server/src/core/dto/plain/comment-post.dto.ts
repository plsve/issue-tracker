import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserDTO } from "././user.dto";
import { IssueDTO } from "./issue.dto";

export class CommentPostDTO {

    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsNotEmpty()
    @IsInt()
    issueId: number;

    @IsNotEmpty()
    @IsDate()
    dateCreated: Date;
    
    @IsOptional()
    @IsString()
    content: string;
}