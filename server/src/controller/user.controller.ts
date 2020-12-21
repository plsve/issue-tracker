import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseFilters, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { QueryFailedExceptionFilter } from "src/error/query-failed-exception.filter";
import { CreateUserDTO } from "../dto/create-user.dto";
import { UpdateUserDTO } from "../dto/update-user.dto";
import { User } from "../model/user.entity";
import { UserService } from "../service/user.service";
import { IntPathParams } from "./int-path-params";

@Controller('users')
@UseFilters(new QueryFailedExceptionFilter())
export class UserController {

    constructor(private userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param() params): Promise<User> {
        return this.userService.findOne(params.id);
    }
    
    @Post()
    create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
        return this.userService.create(createUserDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param() params: IntPathParams, @Body() updateUserDTO: UpdateUserDTO): Promise<User> {
        return this.userService.update(params.id, updateUserDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param() params): Promise<void> {
        return this.userService.remove(params.id);
    }


}