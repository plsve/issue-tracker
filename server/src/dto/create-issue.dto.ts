import { IsDecimal, IsEnum, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Max } from 'class-validator';
import { ISSUE_TYPES } from 'src/constant/issue-type.enum';
import { ValidationMessages } from 'src/constant/validation-message.const';
import { WorkHourScale } from 'src/constant/work-hour-scale.const';

export class CreateIssueDTO {

    @IsNotEmpty()
    @IsString()
    verboseName: string;

    @IsNotEmpty()
    @IsEnum(ISSUE_TYPES, { message: ValidationMessages.getWrongIssueType })
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
    @IsNumber({ maxDecimalPlaces: WorkHourScale.scale }, { message: ValidationMessages.getWrongDecimals('hoursEstimated') })
    hoursEstimated: number;

    @IsOptional()
    @Max(1000)
    @IsNumber({ maxDecimalPlaces: WorkHourScale.scale }, { message: ValidationMessages.getWrongDecimals('hoursRemaining') })
    hoursRemaining: number;

    @IsOptional()
    @Max(1000)
    @IsNumber({ maxDecimalPlaces: WorkHourScale.scale }, { message: ValidationMessages.getWrongDecimals('hoursSpent') })
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