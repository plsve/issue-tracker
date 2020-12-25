import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseFilters, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateCommentPostDTO } from "src/dto/create-comment-post.dto";
import { CreateProjectDTO } from "src/dto/create-project.dto";
import { UpdateCommentPostDTO } from "src/dto/update-comment-post.dto";
import { UpdateProjectDTO } from "src/dto/update-project.dto";
import { QueryFailedExceptionFilter } from "src/error/query-failed-exception.filter";
import { Project } from "../model/project.entity";
import { ProjectService } from "../service/project.service";
import { IntPathParams } from "./int-path-params";

@Controller('projects')
@UseFilters(new QueryFailedExceptionFilter())
export class ProjectController {

    constructor(private projectService: ProjectService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Project[]> {
        return this.projectService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param() params: IntPathParams): Promise<Project> {
        return this.projectService.findOne(params.id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createProjectDTO: CreateProjectDTO): Promise<Project> {
        return this.projectService.create(createProjectDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param() params: IntPathParams, @Body() updateProjectDTO: UpdateProjectDTO): Promise<Project> {
        return this.projectService.update(params.id, updateProjectDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param() params: IntPathParams): Promise<void> {
        return this.projectService.remove(params.id);
    }



}