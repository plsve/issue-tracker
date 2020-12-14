import { Type } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { PreferenceDTO } from './plain/preference.dto';

export class RegisterUserDTO {

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
    
    @IsOptional()
    @IsString()
    photo: string;

    @IsOptional()
    @IsInt({each: true})
    projectIds: number[];

    @IsOptional()
    @IsInt({each: true})
    taskIds: number[];

    @IsOptional()
    @IsString({each: true})
    permissionIds: string[];

    @IsOptional()
    @ValidateNested()
    @Type(() => PreferenceDTO)
    preference: PreferenceDTO;

}