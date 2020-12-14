import { Body, Controller, Get, Post, UseFilters } from "@nestjs/common";
import { QueryFailedExceptionFilter } from "src/query-failed-exception.filter";
import { RegisterUserDTO } from "../dto/register-user.dto";
import { User } from "../model/user.entity";
import { UserService } from "../service/user.service";

@Controller('users')
@UseFilters(new QueryFailedExceptionFilter())
export class UserController {

    constructor(private userService: UserService) { }

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Post('register')
    register(@Body() registerUserDTO: RegisterUserDTO): Promise<User> {
        return this.userService.register(registerUserDTO);
    }
}