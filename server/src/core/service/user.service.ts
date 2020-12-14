import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDTO } from '../dto/register-user.dto';
import { Language } from '../model/language.entity';
import { Permission } from '../model/permission.entity';
import { User } from '../model/user.entity';
import { Preference } from '../model/preference.entity';
import { Project } from '../model/project.entity';
import { Task } from '../model/task.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findByUsername(username: string): Promise<User[]> {
    return await this.userRepository.find({ where: { username } });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async register(registerUserDTO: RegisterUserDTO): Promise<any> {

    const { preference, projectIds, taskIds, permissionIds, ...partialUser } = registerUserDTO;
    const user = new User(partialUser);


    // if projectIds are not null and not empty
    if (registerUserDTO.projectIds?.length) {
      user.projects = await this.projectRepository.findByIds(registerUserDTO.projectIds);
    }

    if (registerUserDTO.taskIds?.length) {
      user.tasks = await this.taskRepository.findByIds(registerUserDTO.taskIds);
    }

    if (registerUserDTO.permissionIds?.length) {
      user.permissions = await this.permissionRepository.findByIds(registerUserDTO.permissionIds);
    } else {
      user.permissions = await this.permissionRepository.findByIds(['MANAGE_TASKS', 'MANAGE_DOCS']);
    }

    if (registerUserDTO.preference) {
      const newPreference = new Preference(registerUserDTO.preference);
      user.preference = newPreference;
      this.preferenceRepository.save(newPreference);
    } else {
      const newPreference = new Preference({
        theme: 'Light',
        language: await this.languageRepository.findOne(1) // TODO findByName 'English'
      });
      user.preference = newPreference;
    }

    //TODO omit password
    //TODO hash password

    return await this.userRepository.save(user);
  }
}