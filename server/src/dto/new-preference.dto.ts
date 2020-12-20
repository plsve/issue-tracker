import { IsNotEmpty, IsString } from "class-validator";

export class NewPreferenceDTO {
    
    @IsNotEmpty()
    @IsString()
    theme: string;

    @IsNotEmpty()
    @IsString()
    languageId: number;
}