import { IsDecimal, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Max } from 'class-validator';
import { WorkHourScale } from 'src/constant/work-hour-scale.const';

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
    @IsInt()
    priority: number;
    
    @IsNotEmpty()
    @IsInt()
    createdByUserId: number;

    @IsOptional()
    @Max(1000)
    @IsNumber({maxDecimalPlaces: WorkHourScale.scale}, {message: WorkHourScale.getValidationMessage('hoursEstimated')})
    hoursEstimated: number;

    @IsOptional()
    @Max(1000)
    @IsNumber({maxDecimalPlaces: WorkHourScale.scale}, {message: WorkHourScale.getValidationMessage('hoursRemaining')})
    hoursRemaining: number;

    @IsOptional()
    @Max(1000)
    @IsNumber({maxDecimalPlaces: WorkHourScale.scale}, {message: WorkHourScale.getValidationMessage('hoursSpent')})
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