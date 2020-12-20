import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HELPER_QUERIES } from 'src/constant/query.const';
import { CreateIssueDTO } from 'src/dto/create-issue.dto';
import { Project } from 'src/model/project.entity';
import { User } from 'src/model/user.entity';
import { Repository } from 'typeorm';
import { Issue } from '../model/issue.entity';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(Issue)
    private issueRepository: Repository<Issue>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<any[]> {
    return await this.issueRepository.createQueryBuilder('issue')
      .select([
        'issue',
        'project.id',
        'issueUser.id', 'issueUser.name', 'issueUser.surname', 'issueUser.username', 'issueUser.photo', 'issueUser.deleted',
        'commentPost',
        'commentUser',
        'issueParent.id', 'issueParent.name', 'issueParent.status',
        'issueChild.id', 'issueChild.name', 'issueChild.status',
        'issueCreatedByUser.id', 'issueCreatedByUser.name', 'issueCreatedByUser.surname', 'issueCreatedByUser.username', 'issueCreatedByUser.deleted',
        'issueEditedByUser.id', 'issueEditedByUser.name', 'issueEditedByUser.surname', 'issueEditedByUser.username', 'issueEditedByUser.deleted',
      ])
      .leftJoin('issue.commentPosts', 'commentPost')
      .leftJoin('commentPost.user', 'commentUser')
      .leftJoin('issue.project', 'project')
      .leftJoin('issue.user', 'issueUser')
      .leftJoin('issue.parentIssue', 'issueParent')
      .leftJoin('issue.childIssues', 'issueChild')
      .leftJoin('issue.createdByUser', 'issueCreatedByUser')
      .leftJoin('issue.editedByUser', 'issueEditedByUser')
      .getMany();
  }

  findOne(id: string): Promise<Issue> {
    return this.issueRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.issueRepository.delete(id);
  }

  async create(createIssueDTO: CreateIssueDTO): Promise<any> {
    const { projectId, userId, parentIssueId, createdByUserId, ...partialIssue } = createIssueDTO;
    const issue = new Issue(partialIssue);

    // Handle project
    const project = await this.projectRepository.findOne(createIssueDTO.projectId);
    if (project) {
      issue.project = project;
    } else {
      throw new HttpException('projectId ' + createIssueDTO.projectId + ' not found', HttpStatus.NOT_FOUND)
    }

    //Handle user
    if (createIssueDTO.userId) {
      const user = await this.userRepository.findOne(createIssueDTO.userId);
      if (user) {
        issue.user = user;
      } else {
        throw new HttpException('userId ' + createIssueDTO.userId + ' not found', HttpStatus.NOT_FOUND)
      }
    }

    // Handle parent issue
    if (createIssueDTO.parentIssueId) {
      const parentIssue = await this.issueRepository.findOne(createIssueDTO.parentIssueId);
      if (parentIssue) {
        issue.parentIssue = parentIssue;
        if (!parentIssue.childIssues) {
          parentIssue.childIssues = [];
        }
        parentIssue.childIssues.push(issue);
        await this.issueRepository.save(parentIssue);
      } else {
        throw new HttpException('parentIssueId ' + createIssueDTO.parentIssueId + ' not found', HttpStatus.NOT_FOUND)
      }
    }

    // Handle created by user
    const createdByUser = await this.userRepository.findOne(createIssueDTO.createdByUserId);
    if (createdByUser) {
      issue.createdByUser = createdByUser;
    } else {
      throw new HttpException('createdByUserId ' + createIssueDTO.createdByUserId + ' not found', HttpStatus.NOT_FOUND)
    }
    issue.created = new Date();
    issue.name = await this.generateIssueName(project.prefix);

    // Strip user, parent issue
    return {
      ...await this.issueRepository.save(issue),
      createdByUser: {
        id: createIssueDTO.createdByUserId
      },
      user: {
        id: createIssueDTO.userId
      },
      parentIssue: {
        id: createIssueDTO.parentIssueId
      },
      childIssues: [],
    };
  }

  private async generateIssueName(projectPrefix: string): Promise<string> {
    const result = (await this.issueRepository.query(HELPER_QUERIES.getMaxIssueSuffix))[0];
    return projectPrefix + '-' + (+result.max + 1);
  }

  // async update(id: number, updateIssueDTO: UpdateIssueDTO): Promise<Issue> {

  // }
}