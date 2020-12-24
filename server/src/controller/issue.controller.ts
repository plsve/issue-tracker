import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseFilters, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateCommentPostDTO } from "src/dto/create-comment-post.dto";
import { CreateIssueDTO } from "src/dto/create-issue.dto";
import { UpdateCommentPostDTO } from "src/dto/update-comment-post.dto";
import { UpdateIssueDTO } from "src/dto/update-issue.dto";
import { QueryFailedExceptionFilter } from "src/error/query-failed-exception.filter";
import { Issue } from "../model/issue.entity";
import { IssueService } from "../service/issue.service";
import { IntPathParams } from "./int-path-params";

@Controller('issues')
@UseFilters(new QueryFailedExceptionFilter())
export class IssueController {

    constructor(private issueService: IssueService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Issue[]> {
        return this.issueService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param() params): Promise<Issue> {
        return this.issueService.findOne(params.id);
    }
    
    @Post()
    create(@Body() createIssueDTO: CreateIssueDTO): Promise<Issue> {
        return this.issueService.create(createIssueDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param() params: IntPathParams, @Body() updateIssueDTO: UpdateIssueDTO): Promise<Issue> {
        return this.issueService.update(params.id, updateIssueDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param() params): Promise<void> {
        return this.issueService.remove(params.id);
    }

    @Post(':issueId/comments')
    createComment(@Param() params: IntPathParams, @Body() createCommentPostDTO: CreateCommentPostDTO): Promise<Issue> {
        return this.issueService.createCommentPost(params.issueId, createCommentPostDTO);
    }

    @Put(':issueId/comments/:id')
    updateComment(@Param() params: IntPathParams, @Body() updateCommentPostDTO: UpdateCommentPostDTO): Promise<Issue> {
        return this.issueService.updateCommentPost(params.issueId, params.id, updateCommentPostDTO);
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(':issueId/comments/:id')
    removeComment(@Param() params: IntPathParams): Promise<void> {
        return this.issueService.removeCommentPost(params.issueId, params.id);
    }


}