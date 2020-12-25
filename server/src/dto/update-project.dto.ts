import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, maxLength, MinLength } from "class-validator";

export class UpdateProjectDTO {

    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(4)
    prefix: string;

    @IsOptional()
    @IsString()
    description: string;
    
    @IsNotEmpty()
    @IsInt({each: true})
    userIds: number[];

    @IsNotEmpty()
    @IsInt({each: true})
    issueIds: number[];

    @IsNotEmpty()
    @IsInt({each: true})
    docFolderIds: number[];
}