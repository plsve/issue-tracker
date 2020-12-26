import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { resolve } from 'path';
import { CreateProjectDTO } from 'src/dto/create-project.dto';
import { UpdateProjectDTO } from 'src/dto/update-project.dto';
import { DocFolder } from 'src/model/doc-folder.entity';
import { DocPage } from 'src/model/doc-page.entity';
import { Issue } from 'src/model/issue.entity';
import { User } from 'src/model/user.entity';
import { Connection, EntityManager, getConnection, getManager, Repository, Transaction, TransactionRepository } from 'typeorm';
import { Project } from '../model/project.entity';
import { IssueService } from './issue.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Issue)
    private issueRepository: Repository<Issue>,
    @InjectRepository(DocFolder)
    private docFolderRepository: Repository<DocFolder>,
    @InjectRepository(DocPage)
    private docPageRepository: Repository<DocPage>,
    private issueService: IssueService
  ) { }

  private findQueryBuilder = this.projectRepository.createQueryBuilder('project')
    .select([
      'project',
      'usr',
      'issue.id', 'issue.status',
      'comment.workedHours',
      'docPage.id',
    ])
    .leftJoin('project.users', 'usr')
    .leftJoin('project.issues', 'issue')
    .leftJoin('issue.commentPosts', 'comment')
    .leftJoin('project.docFolders', 'docFolder')
    .leftJoin('docFolder.docPages', 'docPage')

  findAll(): Promise<Project[]> {
    return this.findQueryBuilder.clone().getMany();
  }

  findOne(id: number): Promise<Project> {
    return this.findQueryBuilder.clone().where('project.id = :id', { id }).getOne();
  }

  private async updateDocsForProject(entityManager: EntityManager, id, updateProjectDTO: UpdateProjectDTO) {
    const missingDocFolderIds = [];
    const existingDocFolders = await this.docFolderRepository.find({ where: { project: { id } }, relations: ['docPages'] });
    console.log('existingDocFolders');
    console.log(existingDocFolders);
    const outstandingDocFolderIds = existingDocFolders.map(r => r.id);
    updateProjectDTO.docFolderIds.forEach(item => {
      if (outstandingDocFolderIds.includes(item)) {
        return true;
      } else {
        missingDocFolderIds.push(item);
        return false;
      }
    }); 
    if (missingDocFolderIds.length == 0) {
      const updateDocFolders = existingDocFolders.filter(i => updateProjectDTO.docFolderIds.includes(i.id));
      console.log('updateDocFolders');
      console.log(updateDocFolders);
      const deleteDocFolders = existingDocFolders.filter(i => !updateProjectDTO.docFolderIds.includes(i.id));
      console.log('deleteDocFolders');
      console.log(deleteDocFolders);
      if (deleteDocFolders.length > 0) {

        // Handle doc pages
        const deleteDocPages = [];
        deleteDocFolders.map(r => deleteDocPages.push(...r.docPages));
        console.log('deleteDocPages');
        console.log(deleteDocPages);
        if (deleteDocPages.length > 0) {
          await entityManager.delete(DocPage, deleteDocPages.map(i => i.id));

        }
        await entityManager.delete(DocFolder, deleteDocFolders.map(i => i.id));
      }
      return updateDocFolders;
    } else {
      throw new HttpException('docFolderIds [' + missingDocFolderIds + '] not found', HttpStatus.NOT_FOUND);
    }
  }

  private async updateIssuesForProject(entityManager: EntityManager, id, updateProjectDTO: UpdateProjectDTO) {
    const missingIssueIds = [];
    const existingIssues = await this.issueRepository.find({ where: { project: { id } } });
    const existingIssueIds = existingIssues.map(r => r.id);
    updateProjectDTO.issueIds.forEach(item => {
      if (existingIssueIds.includes(item)) {
        return true;
      } else {
        missingIssueIds.push(item);
        return false;
      }
    }); if(missingIssueIds.length == 0) {
      const updateIssues = existingIssues.filter(i => updateProjectDTO.issueIds.includes(i.id));
      console.log('updateIssues');
      console.log(updateIssues);
      const deleteIssues = existingIssues.filter(i => !updateProjectDTO.issueIds.includes(i.id));
      console.log('deleteIssues');
      console.log(deleteIssues);
      if (deleteIssues.length > 0) {
        await entityManager.save(Issue, deleteIssues.map(issue => {
          return {
            ...issue,
            childIssues: []
          }
        }));
        await entityManager.delete(Issue, deleteIssues.map(i => i.id));
      }
      return updateIssues;
    } else {
      throw new HttpException('issueIds [' + missingIssueIds + '] not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateProjectDTO: UpdateProjectDTO): Promise<Project> {
    await getManager().transaction(async entityManager => {
      const updateProject = await this.projectRepository.findOne(id);

      if (updateProject) {
        updateProject.name = updateProjectDTO.name;
        updateProject.prefix = updateProjectDTO.prefix;
        updateProject.description = updateProjectDTO.description;
        updateProject.name = updateProjectDTO.name;

        const existingName = (await this.projectRepository.find({ where: { name: updateProjectDTO.name } }))[0];
        if (existingName && existingName.id != id) {
          throw new HttpException('name ' + updateProjectDTO.name + ' already exists', HttpStatus.BAD_REQUEST);
        }

        const existingPrefix = (await this.projectRepository.find({ where: { prefix: updateProjectDTO.prefix } }))[0];
        if (existingPrefix && existingName.id != id) {
          throw new HttpException('prefix ' + updateProjectDTO.prefix + ' already exists', HttpStatus.BAD_REQUEST);
        }

        // Handle doc folders
        updateProject.docFolders = await this.updateDocsForProject(entityManager, id, updateProjectDTO);

        // Handle issues
        updateProject.issues = await this.updateIssuesForProject(entityManager, id, updateProjectDTO);

        // Handle users
        const updateUsers = updateProjectDTO.userIds.length > 0 ? await this.userRepository.findByIds(updateProjectDTO.userIds) : [];
        const missingUserIds = updateProjectDTO.userIds.filter(item => updateUsers.map(i => i.id).indexOf(item) < 0);
        if (missingUserIds.length === 0) {
          updateProject.users = updateUsers;
        } else {
          throw new HttpException('userIds [' + missingUserIds + '] not found', HttpStatus.NOT_FOUND);
        }

        await entityManager.save(updateProject);
      } else {
        throw new HttpException('project id ' + id + ' not found', HttpStatus.BAD_REQUEST);
      }

    });

    return await this.findOne(id);
  }

  async create(createProjectDTO: CreateProjectDTO): Promise<Project> {
    const { userIds, ...partialProject } = createProjectDTO;
    const createProject = new Project(partialProject);

    const existingName = (await this.projectRepository.find({ where: { name: createProjectDTO.name } }))[0];
    if (existingName) {
      throw new HttpException('name ' + createProjectDTO.name + ' already exists', HttpStatus.BAD_REQUEST);
    }

    const existingPrefix = (await this.projectRepository.find({ where: { prefix: createProjectDTO.prefix } }))[0];
    if (existingPrefix) {
      throw new HttpException('prefix ' + createProjectDTO.prefix + ' already exists', HttpStatus.BAD_REQUEST);
    }

    // Handle users
    const updateUsers = createProjectDTO.userIds.length > 0 ? await this.userRepository.findByIds(createProjectDTO.userIds) : [];
    const missingUserIds = createProjectDTO.userIds.filter(item => updateUsers.map(i => i.id).indexOf(item) < 0);
    if (missingUserIds.length === 0) {
      createProject.users = updateUsers;
    } else {
      throw new HttpException('userIds [' + missingUserIds + '] not found', HttpStatus.NOT_FOUND);
    }

    createProject.created = new Date();

    await this.projectRepository.save(createProject);
    return await this.findOne(createProject.id);
  }

  async remove(id: number): Promise<void> {

    await getManager().transaction(async entityManager => {
      const deleteProject = await entityManager.findOne(Project, id, { relations: ['issues'] });
      console.log('deleteProject');
      console.log(deleteProject);

      if (deleteProject) {

        // Handle issues
        if (deleteProject.issues.length > 0) {
          await entityManager.delete(Issue, deleteProject.issues.map(i => i.id));
        }

        deleteProject.docFolders = await this.updateDocsForProject(entityManager, id, {
          docFolderIds: []
        } as UpdateProjectDTO)

        await entityManager.delete(Project, id);
      } else {
        throw new HttpException('project id ' + id + ' not found', HttpStatus.BAD_REQUEST);
      }

    });

  }

  async save(project: Project): Promise<Project> {
    return await this.projectRepository.save(project);
  }
}