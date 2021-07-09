import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseFilters, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateCommentPostDTO } from "src/dto/create-comment-post.dto";
import { CreateIssueDTO } from "src/dto/create-issue.dto";
import { UpdateCommentPostDTO } from "src/dto/update-comment-post.dto";
import { UpdateIssueDTO } from "src/dto/update-issue.dto";
import { QueryFailedExceptionFilter } from "src/error/query-failed-exception.filter";
import { Issue } from "../model/issue.entity";
import { IssueService } from "../service/issue.service";
import { IntPathParams } from "./int-path-params";
import { IssuePathParams } from "./issue-path-params";

@Controller('issues')
@UseFilters(new QueryFailedExceptionFilter())
export class IssueController {

    constructor(private issueService: IssueService) { }

    @Get()
    findAll(@Query() queryParams): Promise<Issue[]> {
        return this.issueService.findAll(queryParams);
    }

    @Get(':id')
    findOne(@Param() params): Promise<Issue> {
        return this.issueService.findOne(params.id);
    }

    @UseGuards(JwtAuthGuard)
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

    @UseGuards(JwtAuthGuard)
    @Post(':issueId/comments')
    createComment(@Param() params: IssuePathParams, @Body() createCommentPostDTO: CreateCommentPostDTO): Promise<Issue> {
        return this.issueService.createCommentPost(params.issueId, createCommentPostDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':issueId/comments/:id')
    updateComment(@Param() params: IssuePathParams, @Body() updateCommentPostDTO: UpdateCommentPostDTO): Promise<Issue> {
        return this.issueService.updateCommentPost(params.issueId, params.id, updateCommentPostDTO);
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(':issueId/comments/:id')
    removeComment(@Param() params: IssuePathParams): Promise<void> {
        return this.issueService.removeCommentPost(params.issueId, params.id);
    }


}