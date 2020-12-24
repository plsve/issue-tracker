import { IsDecimal, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxDate, ValidateIf } from "class-validator";
import { ValidationMessages } from "src/constant/validation-message.const";
import { WorkHourScale } from "src/constant/work-hour-scale.const";

export class CreateCommentPostDTO {

    @IsNotEmpty()
    @IsInt()
    userId: number;

    @ValidateIf(o => !o.workedHours || o.content, { message: ValidationMessages.getContentOrHoursMissing() })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ValidateIf(o => !o.content || o.workedHours, { message: ValidationMessages.getContentOrHoursMissing() })
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: WorkHourScale.scale }, { message: ValidationMessages.getWrongDecimals('workedHours') })
    workedHours: number;



}