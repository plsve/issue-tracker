import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { WorkHourScale } from "src/constant/work-hour-scale.const";
import { ValidationMessages } from "src/constant/validation-message.const";

export class CommentPostDTO {

    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsNotEmpty()
    @IsInt()
    issueId: number;
    
    @IsOptional()
    @IsString()
    content: string;

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: WorkHourScale.scale }, { message: ValidationMessages.getWrongDecimals('workedHours') })
    workedHours: number;
}