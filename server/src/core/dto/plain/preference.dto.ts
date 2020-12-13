import { IsString } from "class-validator";

export class PreferenceDTO {
    id: number;

    @IsString()
    theme: string;

    @IsString()
    languageId: number;

    personId: number;
}