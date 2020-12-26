import { IsNotEmpty, IsString, IsOptional, IsInt } from "class-validator";

export class CreateDocPageDTO {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsInt()
    docFolderId: number;

    @IsNotEmpty()
    @IsInt()
    createdByUserId: number;
}