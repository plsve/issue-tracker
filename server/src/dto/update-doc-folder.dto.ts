import { IsNotEmpty, IsString, MaxLength, IsInt, IsOptional } from "class-validator";

export class UpdateDocFolderDTO {

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;

    @IsNotEmpty()
    @IsInt()
    projectId: number;

    @IsNotEmpty()
    @IsInt({ each: true })
    childDocFolderIds: number[];

    @IsOptional()
    @IsInt()
    parentDocFolderId: number;
}