import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocFolder } from '../model/doc-folder.entity';

@Injectable()
export class DocFolderService {
  constructor(
    @InjectRepository(DocFolder)
    private docFolderRepository: Repository<DocFolder>,
  ) {}

  findAll(): Promise<DocFolder[]> {
    return this.docFolderRepository.find();
  }

  findOne(id: string): Promise<DocFolder> {
    return this.docFolderRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.docFolderRepository.delete(id);
  }

  async save(docFolder: DocFolder): Promise<DocFolder> {
      return await this.docFolderRepository.save(docFolder);
  }
}