import { IsNotEmpty, IsString } from "class-validator";

export class PreferenceDTO {
    
    @IsNotEmpty()
    @IsString()
    theme: string;

    @IsNotEmpty()
    @IsString()
    languageId: number;
}