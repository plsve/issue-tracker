import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from '../model/language.entity';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  findAll(): Promise<Language[]> {
    return this.languageRepository.find();
  }

  findOne(id: string): Promise<Language> {
    return this.languageRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.languageRepository.delete(id);
  }

  async save(language: Language): Promise<Language> {
      return await this.languageRepository.save(language);
  }
}