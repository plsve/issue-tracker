import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Preference } from '../model/preference.entity';

@Injectable()
export class PreferenceService {
  constructor(
    @InjectRepository(Preference)
    private preferenceRepository: Repository<Preference>,
  ) {}

  findAll(): Promise<Preference[]> {
    return this.preferenceRepository.find();
  }

  findOne(id: string): Promise<Preference> {
    return this.preferenceRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.preferenceRepository.delete(id);
  }

  async save(preference: Preference): Promise<Preference> {
      return await this.preferenceRepository.save(preference);
  }
}