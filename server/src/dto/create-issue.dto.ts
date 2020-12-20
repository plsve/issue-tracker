import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateIssueDTO {

    @IsNotEmpty()
    @IsString()
    verboseName: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsInt()
    priority: number;
    
    @IsNotEmpty()
    @IsInt()
    createdByUserId: number;

    @IsOptional()
    @IsInt()
    hoursEstimated: number;

    @IsOptional()
    @IsInt()
    hoursRemaining: number;

    @IsOptional()
    @IsInt()
    hoursSpent: number;

    @IsOptional()
    @IsString()
    gitLink: string;
    
    @IsNotEmpty()
    @IsInt()
    projectId: number;

    @IsOptional()
    @IsInt()
    userId: number;

    @IsOptional()
    parentIssueId: number;

}