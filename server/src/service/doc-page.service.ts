import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDocPageDTO } from 'src/dto/create-doc-page.dto';
import { UpdateDocPageDTO } from 'src/dto/update-doc-page.dto';
import { DocFolder } from 'src/model/doc-folder.entity';
import { User } from 'src/model/user.entity';
import { Repository } from 'typeorm';
import { DocPage } from '../model/doc-page.entity';

@Injectable()
export class DocPageService {
  constructor(
    @InjectRepository(DocPage)
    private docPageRepository: Repository<DocPage>,
    @InjectRepository(DocFolder)
    private docFolderRepository: Repository<DocFolder>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  private findQueryBuilder = this.docPageRepository.createQueryBuilder('docPage')
    .select([
      'docPage',
      'editedByUser.id', 'editedByUser.name', 'editedByUser.surname', 'editedByUser.username', 'editedByUser.deleted',
      'createdByUser.id', 'createdByUser.name', 'createdByUser.surname', 'createdByUser.username', 'createdByUser.deleted',
      'docFolder.id', 'docFolder.name',
    ])
    .leftJoin('docPage.editedByUser', 'editedByUser')
    .leftJoin('docPage.createdByUser', 'createdByUser')
    .leftJoin('docPage.docFolder', 'docFolder')

  findAll(): Promise<DocPage[]> {
    return this.findQueryBuilder.clone().getMany();
  }

  findOne(id: number): Promise<DocPage> {
    return this.findQueryBuilder.clone().where('docPage.id = :id', { id }).getOne();
  }

  async create(createDocPageDTO: CreateDocPageDTO): Promise<DocPage> {
    const createDocPage = new DocPage({ title: createDocPageDTO.title, content: createDocPageDTO.content, created: new Date() });

    // Handle doc folder
    const updateDocFolder = await this.docFolderRepository.findOne(createDocPageDTO.docFolderId);
    if (updateDocFolder) {
      createDocPage.docFolder = updateDocFolder;
    } else {
      throw new HttpException('docFolderId ' + createDocPageDTO.docFolderId + ' not found', HttpStatus.NOT_FOUND)
    }

    // Handle created by user
    if (createDocPageDTO.createdByUserId) {
      const updateCreatedByUser = await this.userRepository.findOne(createDocPageDTO.createdByUserId);
      if (updateCreatedByUser) {
        createDocPage.createdByUser = updateCreatedByUser;
      } else {
        throw new HttpException('editedByUserId ' + createDocPageDTO.createdByUserId + ' not found', HttpStatus.NOT_FOUND)
      }
    }

    await this.docPageRepository.save(createDocPage);

    return this.docPageRepository.findOne(createDocPage.id);
  }

  async update(id: number, updateDocPageDTO: UpdateDocPageDTO): Promise<DocPage> {

    const updateDocPage = await this.docPageRepository.findOne(id);
    if (updateDocPage) {
      updateDocPage.title = updateDocPageDTO.title;
      updateDocPage.content = updateDocPageDTO.content;
      updateDocPage.edited = updateDocPageDTO.edited;

      // Handle doc folder
      const updateDocFolder = await this.docFolderRepository.findOne(updateDocPageDTO.docFolderId);
      if (updateDocFolder) {
        updateDocPage.docFolder = updateDocFolder;
      } else {
        throw new HttpException('docFolderId ' + updateDocPageDTO.docFolderId + ' not found', HttpStatus.NOT_FOUND)
      }

      // Handle edited by user
      if (updateDocPageDTO.editedByUserId) {
        const updateEditedByUser = await this.userRepository.findOne(updateDocPageDTO.editedByUserId);
        if (updateEditedByUser) {
          updateDocPage.editedByUser = updateEditedByUser;
        } else {
          throw new HttpException('editedByUserId ' + updateDocPageDTO.editedByUserId + ' not found', HttpStatus.NOT_FOUND)
        }
      }

      await this.docPageRepository.save(updateDocPage);

      return this.docPageRepository.findOne(id);

    } else {
      throw new HttpException('doc page id ' + id + ' not found', HttpStatus.NOT_FOUND)
    }
  }


  async remove(id: number): Promise<void> {
    const deleteDocPage = await this.docPageRepository.findOne(id);
    if (deleteDocPage) {
      await this.docPageRepository.delete(id);
    } else {
      throw new HttpException('doc page id ' + id + ' not found', HttpStatus.NOT_FOUND)
    }

  }

  async save(docPage: DocPage): Promise<DocPage> {
    return await this.docPageRepository.save(docPage);
  }
}