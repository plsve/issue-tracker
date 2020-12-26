import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseFilters, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateDocFolderDTO } from "src/dto/create-doc-folder.dto";
import { CreateDocPageDTO } from "src/dto/create-doc-page.dto";
import { UpdateDocFolderDTO } from "src/dto/update-doc-folder.dto";
import { UpdateDocPageDTO } from "src/dto/update-doc-page.dto";
import { QueryFailedExceptionFilter } from "src/error/query-failed-exception.filter";
import { DocFolder } from "src/model/doc-folder.entity";
import { DocPage } from "src/model/doc-page.entity";
import { DocFolderService } from "src/service/doc-folder.service";
import { DocPageService } from "src/service/doc-page.service";
import { DocPagePathParams } from "./doc-page-path-params";
import { IntPathParams } from "./int-path-params";

@Controller()
@UseFilters(new QueryFailedExceptionFilter())
export class DocsController {

    constructor(private docFolderService: DocFolderService,
        private docPageService: DocPageService) { }

    @UseGuards(JwtAuthGuard)
    @Get('doc-folders')
    findAll(): Promise<DocFolder[]> {
        return this.docFolderService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('doc-folders/:id')
    findOne(@Param() params: IntPathParams): Promise<DocFolder> {
        return this.docFolderService.findOne(params.id);
    }

    @Post('doc-folders')
    create(@Body() createDocFolderDTO: CreateDocFolderDTO): Promise<DocFolder> {
        return this.docFolderService.create(createDocFolderDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Put('doc-folders/:id')
    update(@Param() params: IntPathParams, @Body() updateDocFolderDTO: UpdateDocFolderDTO): Promise<DocFolder> {
        return this.docFolderService.update(params.id, updateDocFolderDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('doc-folders/:id')
    remove(@Param() params: IntPathParams): Promise<void> {
        return this.docFolderService.remove(params.id);
    }

    // Doc pages

    @UseGuards(JwtAuthGuard)
    @Get('doc-pages')
    findAllDocPages(): Promise<DocPage[]> {
        return this.docPageService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('doc-pages/:id')
    findOneDocPage(@Param() params: IntPathParams): Promise<DocPage> {
        return this.docPageService.findOne(params.id);
    }

    @Post('doc-pages')
    createDocPage(@Body() createDocPageDTO: CreateDocPageDTO): Promise<DocPage> {
        return this.docPageService.create(createDocPageDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Put('doc-pages/:id')
    updateDocPage(@Param() params: IntPathParams, @Body() updateDocPageDTO: UpdateDocPageDTO): Promise<DocPage> {
        return this.docPageService.update(params.id, updateDocPageDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('doc-pages/:id')
    removeDocPage(@Param() params: IntPathParams): Promise<void> {
        return this.docPageService.remove(params.id);
    }



}