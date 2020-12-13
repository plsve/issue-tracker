import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../model/person.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  findAll(): Promise<Person[]> {
    return this.personRepository.find();
  }

  findOne(id: string): Promise<Person> {
    return this.personRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.personRepository.delete(id);
  }

  async save(person: Person): Promise<Person> {
      return await this.personRepository.save(person);
  }

  async register(person: Person): Promise<Person> {
    return await this.personRepository.save(person);
}
}