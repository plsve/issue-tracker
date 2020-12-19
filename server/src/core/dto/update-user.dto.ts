import { Type } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { CommentPostDTO } from './plain/comment-post.dto';
import { PreferenceDTO } from './plain/preference.dto';

export class UpdateUserDTO {

    @IsNotEmpty()
    @IsString()
    username: string;
    
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    surname: string;
    
    @IsOptional()
    @IsString()
    photo: string;

    @IsNotEmpty()
    @IsInt({each: true})
    projectIds: number[];

    @IsNotEmpty()
    @IsInt({each: true})
    issueIds: number[];

    @IsNotEmpty()
    @IsString({each: true})
    permissionIds: string[];

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => PreferenceDTO)
    preference: PreferenceDTO;

}