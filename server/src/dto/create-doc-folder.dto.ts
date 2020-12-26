import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateDocFolderDTO {

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;

    @IsNotEmpty()
    @IsInt()
    projectId: number;

}