import { IsNotEmpty, IsString } from "class-validator";

export class CreatePreferenceDTO {
    
    @IsNotEmpty()
    @IsString()
    theme: string;

    @IsNotEmpty()
    @IsString()
    languageId: number;
}