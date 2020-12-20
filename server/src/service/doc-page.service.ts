import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocPage } from '../model/doc-page.entity';

@Injectable()
export class DocPageService {
  constructor(
    @InjectRepository(DocPage)
    private docPageRepository: Repository<DocPage>,
  ) {}

  findAll(): Promise<DocPage[]> {
    return this.docPageRepository.find();
  }

  findOne(id: string): Promise<DocPage> {
    return this.docPageRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.docPageRepository.delete(id);
  }

  async save(docPage: DocPage): Promise<DocPage> {
      return await this.docPageRepository.save(docPage);
  }
}