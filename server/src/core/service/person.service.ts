import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterPersonDTO } from '../dto/register-person.dto';
import { Language } from '../model/language.entity';
import { Permission } from '../model/permission.entity';
import { Person } from '../model/person.entity';
import { Preference } from '../model/preference.entity';
import { Project } from '../model/project.entity';
import { Task } from '../model/task.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(Preference)
    private preferenceRepository: Repository<Preference>,
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) { }

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

  async register(registerPersonDTO: RegisterPersonDTO): Promise<Person> {
    const person = new Person(registerPersonDTO);

    // if projectIds are not null and not empty
    if (registerPersonDTO.projectIds?.length) {
      person.projects = await this.projectRepository.findByIds(registerPersonDTO.projectIds);
    }

    if (registerPersonDTO.taskIds?.length) {
      person.tasks = await this.taskRepository.findByIds(registerPersonDTO.taskIds);
    }

    if (registerPersonDTO.permissionIds?.length) {
      person.permissions = await this.permissionRepository.findByIds(registerPersonDTO.permissionIds);
      // person.permissions = registerPersonDTO.permissionIds.map(permId => {
      //   return new Permission({
      //     id: permId
      //     // TODO add person?
      //   })
      // });
    } else {
      person.permissions = await this.permissionRepository.findByIds(['MANAGE_TASKS', 'MANAGE_DOCS']);
    }

    if (registerPersonDTO.preference) {
      const newPreference = new Preference(registerPersonDTO.preference);
      person.preference = newPreference;
      this.preferenceRepository.save(newPreference);
    } else {
      const newPreference = new Preference({
        theme: 'Light',
        language: await this.languageRepository.findOne(1) // TODO findByName 'English'
      });
      person.preference = newPreference;
    }

    return await this.personRepository.save(person);
  }
}