import { Body, Controller, Get, Post, UseFilters, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { QueryFailedExceptionFilter } from "src/query-failed-exception.filter";
import { RegisterUserDTO } from "../dto/register-user.dto";
import { User } from "../model/user.entity";
import { UserService } from "../service/user.service";

@Controller('users')
@UseFilters(new QueryFailedExceptionFilter())
export class UserController {

    constructor(private userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Post('register')
    register(@Body() registerUserDTO: RegisterUserDTO): Promise<User> {
        return this.userService.register(registerUserDTO);
    }
}