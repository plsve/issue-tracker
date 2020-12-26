import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDocFolderDTO } from 'src/dto/create-doc-folder.dto';
import { UpdateDocFolderDTO } from 'src/dto/update-doc-folder.dto';
import { DocPage } from 'src/model/doc-page.entity';
import { Project } from 'src/model/project.entity';
import { getManager, Repository } from 'typeorm';
import { DocFolder } from '../model/doc-folder.entity';

@Injectable()
export class DocFolderService {
  constructor(
    @InjectRepository(DocFolder)
    private docFolderRepository: Repository<DocFolder>,
    @InjectRepository(DocPage)
    private docPageRepository: Repository<DocPage>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) { }

  private findQueryBuilder = this.docFolderRepository.createQueryBuilder('docFolder')
    .select([
      'docFolder',
      'childDocFolder.id', 'childDocFolder.name',
      'parentDocFolder.id', 'parentDocFolder.name',
      'docPage.id', 'docPage.title',
    ])
    .leftJoin('docFolder.childDocFolders', 'childDocFolder')
    .leftJoin('docFolder.parentDocFolder', 'parentDocFolder')
    .leftJoin('docFolder.docPages', 'docPage')

  findAll(): Promise<DocFolder[]> {
    return this.findQueryBuilder.clone().getMany();
  }

  findOne(id: number): Promise<DocFolder> {
    return this.findQueryBuilder.clone().where('docFolder.id = :id', { id }).getOne();
  }

  async create(createDocFolderDTO: CreateDocFolderDTO): Promise<DocFolder> {
    const docFolder = new DocFolder({ name: createDocFolderDTO.name });

    // Handle project
    const project = await this.projectRepository.findOne(createDocFolderDTO.projectId);
    if (project) {
      docFolder.project = project;
    } else {
      throw new HttpException('projectId ' + createDocFolderDTO.projectId + ' not found', HttpStatus.NOT_FOUND)
    }

    await this.docFolderRepository.save(docFolder);
    return await this.findOne(docFolder.id);
  }

  async update(id: number, updateDocFolderDTO: UpdateDocFolderDTO): Promise<DocFolder> {

    const updateDocFolder = await this.docFolderRepository.findOne(id);
    if (updateDocFolder) {
      updateDocFolder.name = updateDocFolderDTO.name;
      // Handle project
      const updateProject = await this.projectRepository.findOne(updateDocFolderDTO.projectId);
      if (updateProject) {
        updateDocFolder.project = updateProject;
      } else {
        throw new HttpException('projectId ' + updateDocFolderDTO.projectId + ' not found', HttpStatus.NOT_FOUND)
      }

      // Handle parentDocFolder
      if (updateDocFolderDTO.parentDocFolderId) {
        if (id != updateDocFolderDTO.parentDocFolderId) {
          const updateParentDocFolder = await this.docFolderRepository.findOne(updateDocFolderDTO.parentDocFolderId);
          if (updateParentDocFolder) {
            updateDocFolder.parentDocFolder = updateParentDocFolder;
          } else {
            throw new HttpException('parentDocFolderId ' + updateDocFolderDTO.parentDocFolderId + ' not found', HttpStatus.NOT_FOUND)
          }
        } else {
          throw new HttpException('doc folder cannot be parent of itself', HttpStatus.BAD_REQUEST)
        }

      }

      // Handle child doc folders
      const updateChildDocFolders = updateDocFolderDTO.childDocFolderIds.length > 0 ? await this.docFolderRepository.findByIds(updateDocFolderDTO.childDocFolderIds) : [];
      console.log('updateChildDocFolders');
      console.log(updateChildDocFolders);
      if (!updateChildDocFolders.some(i => i.id == id)) {
        const missingChildDocFolderIds = updateDocFolderDTO.childDocFolderIds.filter(item => updateChildDocFolders.map(i => i.id).indexOf(item) < 0);
        if (missingChildDocFolderIds.length === 0) {
          updateDocFolder.childDocFolders = updateChildDocFolders;
        } else {
          throw new HttpException('childDocFolderIds [' + missingChildDocFolderIds + '] not found', HttpStatus.NOT_FOUND);
        }
      } else {
        throw new HttpException('doc folder cannot be child of itself', HttpStatus.BAD_REQUEST)
      }

      await this.docFolderRepository.save(updateDocFolder);

    } else {
      throw new HttpException('doc folder id ' + id + ' not found', HttpStatus.NOT_FOUND)
    }



    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const deleteDocFolder = await this.docFolderRepository.findOne(id);
    if (deleteDocFolder) {
      await this.docFolderRepository.delete(id);
    }else {
      throw new HttpException('doc folder id ' + id + ' not found', HttpStatus.NOT_FOUND)
    }
    
  }

  async save(docFolder: DocFolder): Promise<DocFolder> {
    return await this.docFolderRepository.save(docFolder);
  }
}