import { IsDate, IsDecimal, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { UserDTO } from "./user.dto";
import { IssueDTO } from "./issue.dto";
import { WorkHourScale } from "src/constant/work-hour-scale.const";

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
    @IsNumber()
    @IsDecimal({decimal_digits: WorkHourScale.precision + ',' + WorkHourScale.scale})
    workedHours: number;
}