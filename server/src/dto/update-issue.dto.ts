import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, MaxDate, ValidateNested } from 'class-validator';
import { ISSUE_STATUSES } from 'src/constant/issue-status.enum';
import { ISSUE_TYPES } from 'src/constant/issue-type.enum';
import { ValidationMessages } from 'src/constant/validation-message.const';
import { WorkHourScale } from 'src/constant/work-hour-scale.const';

export class UpdateIssueDTO {

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
    @IsEnum(ISSUE_STATUSES, { message: ValidationMessages.getWrongStatusType })
    status: string;

    @IsNotEmpty()
    @IsInt()
    priority: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    @MaxDate(new Date())
    edited: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    @MaxDate(new Date())
    resolved: Date;

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

    @IsOptional()
    @IsInt()
    editedByUserId: number;

    @IsNotEmpty()
    @IsInt({ each: true })
    commentPostIds: number[];

    @IsNotEmpty()
    @IsInt()
    projectId: number;

    @IsOptional()
    @IsInt()
    userId: number;

    @IsNotEmpty()
    @IsInt({ each: true })
    childIssueIds: number[];

    @IsOptional()
    @IsInt()
    parentIssueId: number;

}