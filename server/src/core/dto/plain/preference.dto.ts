import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class PreferenceDTO {
    
    @IsNotEmpty()
    @IsString()
    theme: string;

    @IsNotEmpty()
    @IsInt()
    languageId: number;
}