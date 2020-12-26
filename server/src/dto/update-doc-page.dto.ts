import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, MaxDate } from "class-validator";

export class UpdateDocPageDTO {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    content: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    @MaxDate(new Date())
    edited: Date;

    @IsNotEmpty()
    @IsInt()
    docFolderId: number;

    @IsOptional()
    @IsInt()
    editedByUserId: number;
}