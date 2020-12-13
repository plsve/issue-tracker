import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { PreferenceDTO } from './plain/preference.dto';

export class RegisterPersonDTO {

    @IsNotEmpty()
    @IsString()
    username: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;
    
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    surname: string;
    
    photo: string;

    projectIds: number[];

    taskIds: number[];

    permissionIds: string[];

    preference: PreferenceDTO;

}