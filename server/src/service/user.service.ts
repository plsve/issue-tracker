import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dto/create-user.dto';
import { Language } from '../model/language.entity';
import { Permission } from '../model/permission.entity';
import { User } from '../model/user.entity';
import { Preference } from '../model/preference.entity';
import { Project } from '../model/project.entity';
import { Issue } from '../model/issue.entity';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { PERMISSION_IDS } from 'src/constant/permission.enum';
import { LANGUAGE_IDS } from 'src/constant/language.enum';
import { THEMES } from 'src/constant/theme.enum';
import { DocPage } from 'src/model/doc-page.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Issue)
    private issueRepository: Repository<Issue>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(Preference)
    private preferenceRepository: Repository<Preference>,
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    @InjectRepository(DocPage)
    private docPageRepository: Repository<DocPage>,
  ) { }

  private findQueryBuilder = this.userRepository.createQueryBuilder('usr')
    .select([
      'usr',
      'issue.id', 'issue.name', 'issue.verboseName', 'issue.status', 'issue.type', 'issue.resolved',
      'commentPost.id', 'commentPost.workedHours', 'commentPost.issueId',
      'preference',
      'language',
      'permission',
      'createdDocPage.id', 'createdDocPage.title',
      'editedDocPage.id', 'editedDocPage.title',
      'createdIssue.id', 'createdIssue.name',
      'editedIssue.id', 'editedIssue.name',
    ])
    .leftJoin('usr.projects', 'project')
    .leftJoin('usr.issues', 'issue')
    .leftJoin('usr.commentPosts', 'commentPost')
    .leftJoin('usr.preference', 'preference')
    .leftJoin('preference.language', 'language')
    .leftJoin('usr.permissions', 'permission')
    .leftJoin('usr.createdDocPages', 'createdDocPage')
    .leftJoin('usr.editedDocPages', 'editedDocPage')
    .leftJoin('usr.createdIssues', 'createdIssue')
    .leftJoin('usr.editedIssues', 'editedIssue');

    private getValidKeysQuery = ''

  async findAll(queryParams): Promise<User[]> {

    console.log(queryParams);
    
    let builder = this.findQueryBuilder.clone();
    
    if(queryParams.projects){    
      builder = builder.andWhere("project.id IN (:...ids)", { ids: queryParams.projects.split(',') });
    }
    
    return await builder.getMany();
  }

  async findOne(id: number): Promise<User> {
    return await this.findQueryBuilder.clone().where('usr.id = :id', { id }).getOne();
  }

  async findBy(filter: any): Promise<User[]> {
    console.log(filter);
    return await this.findQueryBuilder.clone().where(filter).getMany();
  }

  async update(id: number, updateUserDTO: UpdateUserDTO): Promise<User> {
    const updateUser = await this.userRepository.findOne(id, { relations: ['preference'] });
    if (updateUser) {
      updateUser.name = updateUserDTO.name;
      updateUser.surname = updateUserDTO.surname;
      updateUser.photo = updateUserDTO.photo;
      updateUser.username = updateUserDTO.username;

      const existingName = (await this.userRepository.find({ where: { username: updateUserDTO.username } }))[0];
      if (existingName && existingName.id != id) {
        throw new HttpException('username ' + updateUserDTO.username + ' already exists', HttpStatus.BAD_REQUEST);
      }

      // Handle preference
      const updatePreference = await this.preferenceRepository.findOne(updateUser.preference.id);
      const updateLanguage = await this.languageRepository.findOne(updateUserDTO.preference.languageId);
      if (!updateLanguage) {
        throw new HttpException('languageId ' + updateUserDTO.preference.languageId + ' not found', HttpStatus.NOT_FOUND)
      }
      updateUser.preference = updatePreference;
      updateUser.preference.language = updateLanguage;
      updateUser.preference.theme = updateUserDTO.preference.theme;

      // Handle issues
      const updateIssues = updateUserDTO.issueIds.length > 0 ? await this.issueRepository.findByIds(updateUserDTO.issueIds) : [];
      const missingIssueIds = updateUserDTO.issueIds.filter(item => updateIssues.map(i => i.id).indexOf(item) < 0);
      if (missingIssueIds.length === 0) {
        updateUser.issues = updateIssues;
      } else {
        throw new HttpException('issueIds [' + missingIssueIds + '] not found', HttpStatus.NOT_FOUND);
      }

      // Handle projects
      const updateProjects = updateUserDTO.projectIds.length > 0 ? await this.projectRepository.findByIds(updateUserDTO.projectIds) : [];
      const missingProjectIds = updateUserDTO.projectIds.filter(item => updateProjects.map(i => i.id).indexOf(item) < 0);
      if (missingProjectIds.length === 0) {
        updateUser.projects = updateProjects;
      } else {
        throw new HttpException('projectIds [' + missingProjectIds + '] not found', HttpStatus.NOT_FOUND);
      }

      // Handle permissions
      const updatePermissions = updateUserDTO.permissionIds.length > 0 ? await this.permissionRepository.findByIds(updateUserDTO.permissionIds) : [];
      const missingPermissionIds = updateUserDTO.permissionIds.filter(item => updatePermissions.map(i => i.id).indexOf(item) < 0);
      if (missingPermissionIds.length === 0) {
        updateUser.permissions = updatePermissions;
      } else {
        throw new HttpException('permissionIds [' + missingPermissionIds + '] not found', HttpStatus.NOT_FOUND);
      }

      return await this.userRepository.save(updateUser);


    } else {
      throw new HttpException('userId ' + id + ' not found', HttpStatus.NOT_FOUND)
    }

  }

  async findCredentials(username: string): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('usr')
      .select("usr.id", "id")
      .addSelect("usr.password")
      .where("usr.username = :username", { username })
      .getOne();
  }

  async remove(id: number): Promise<void> {
    const updateUser = await this.userRepository.findOne(id);
    if (updateUser) {
      updateUser.projects = [];
      updateUser.issues = [];
      updateUser.deleted = true;
      await this.userRepository.save(updateUser);
    } else {
      throw new HttpException('userId ' + id + ' not found', HttpStatus.NOT_FOUND)
    }
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {

    const { preference, projectIds, issueIds, permissionIds, ...partialUser } = createUserDTO;
    const createUser = new User(partialUser);

    const existingUser = (await this.userRepository.find({ where: { username: createUserDTO.username } }))[0];
    console.log(existingUser);
    if (existingUser) {
      throw new HttpException('username ' + createUserDTO.username + ' already exists', HttpStatus.BAD_REQUEST);
    }

    // if projectIds are not null and not empty
    if (createUserDTO.projectIds?.length) {
      createUser.projects = await this.projectRepository.findByIds(createUserDTO.projectIds);
    }

    if (createUserDTO.issueIds?.length) {
      createUser.issues = await this.issueRepository.findByIds(createUserDTO.issueIds);
    }

    if (createUserDTO.permissionIds?.length) {
      createUser.permissions = await this.permissionRepository.findByIds(createUserDTO.permissionIds);
    } else {
      createUser.permissions = await this.permissionRepository.findByIds([PERMISSION_IDS.MANAGE_ISSUES, PERMISSION_IDS.MANAGE_DOCS]);
    }

    if (createUserDTO.preference) {
      const createPreference = new Preference(createUserDTO.preference);
      createUser.preference = createPreference;
      this.preferenceRepository.save(createPreference);
    } else {
      const createPreference = new Preference({
        theme: THEMES.LIGHT,
        language: await this.languageRepository.findOne(LANGUAGE_IDS.ENGLISH)
      });
      createUser.preference = createPreference;
    }

    //TODO hash password

    return await this.userRepository.save(createUser);
  }
}