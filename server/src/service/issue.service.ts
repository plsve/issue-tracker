import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ISSUE_STATUSES } from 'src/constant/issue-status.enum';
import { HELPER_QUERIES } from 'src/constant/query.const';
import { CreateCommentPostDTO } from 'src/dto/create-comment-post.dto';
import { CreateIssueDTO } from 'src/dto/create-issue.dto';
import { UpdateCommentPostDTO } from 'src/dto/update-comment-post.dto';
import { UpdateIssueDTO } from 'src/dto/update-issue.dto';
import { CommentPost } from 'src/model/comment-post.entity';
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
    @InjectRepository(CommentPost)
    private commentPostRepository: Repository<CommentPost>,
  ) { }

  private findQueryBuilder = this.issueRepository.createQueryBuilder('issue')
    .select([
      'issue',
      'project.id',
      'issueUser.id', 'issueUser.name', 'issueUser.surname', 'issueUser.username', 'issueUser.photo', 'issueUser.deleted',
      'commentPost',
      'commentUser',
      'issueParent.id', 'issueParent.name', 'issueParent.verboseName', 'issueParent.status',
      'issueChild.id', 'issueChild.name', 'issueChild.verboseName', 'issueChild.status',
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
    .leftJoin('issue.editedByUser', 'issueEditedByUser');

  async findAll(): Promise<any[]> {
    return await this.findQueryBuilder.clone().getMany();
  }

  async findOne(id: number): Promise<Issue> {
    return await this.findQueryBuilder.clone().where('issue.id = :id', { id }).getOne();
  }

  async remove(id: number): Promise<void> {
    const deleteIssue = await this.issueRepository.findOne(id);
    if (deleteIssue) {
      await this.issueRepository.delete(id);
    } else {
      throw new HttpException('issueId ' + id + ' not found', HttpStatus.NOT_FOUND)
    }
  }

  async removeCommentPost(issueId: number, id: number): Promise<void> {
    const updateIssue = await this.issueRepository.findOne(issueId, { relations: ['commentPosts'] });
    if (!updateIssue) {
      throw new HttpException('issue id ' + issueId + ' not found', HttpStatus.NOT_FOUND)
    }

    const removeCommentPost = updateIssue.commentPosts.filter(i => i.id == id)[0];
    if (removeCommentPost) {
      await this.commentPostRepository.delete(id);
    } else {
      throw new HttpException('commentPost id ' + id + ' not found for issue id ' + issueId, HttpStatus.NOT_FOUND)
    }
  }

  async createCommentPost(issueId: number, createCommentPostDTO: CreateCommentPostDTO): Promise<Issue> {
    const { userId, ...partialCommentPost } = createCommentPostDTO;
    const createCommentPost = new CommentPost(partialCommentPost);

    // Handle issue
    const updateIssue = await this.issueRepository.findOne(issueId);
    if (updateIssue) {
      createCommentPost.issue = updateIssue;
    } else {
      throw new HttpException('issue id ' + issueId + ' not found', HttpStatus.NOT_FOUND)
    }
    // Handle user
    const updateUser = await this.userRepository.findOne(createCommentPostDTO.userId);
    if (updateUser) {
      createCommentPost.user = updateUser;
    } else {
      throw new HttpException('userId ' + createCommentPostDTO.userId + ' not found', HttpStatus.NOT_FOUND)
    }

    createCommentPost.created = new Date();
    // TODO track correct workedHours across issues and comments
    await this.commentPostRepository.save(createCommentPost);
    return await this.findOne(issueId);

  }

  async updateCommentPost(issueId: number, id: number, updateCommentPostDTO: UpdateCommentPostDTO): Promise<Issue> {

    // Handle issue
    const updateIssue = await this.issueRepository.findOne(issueId, { relations: ['commentPosts'] });
    if (!updateIssue) {
      throw new HttpException('issue id ' + issueId + ' not found', HttpStatus.NOT_FOUND)
    }

    const updateCommentPost = updateIssue.commentPosts.filter(i => i.id == id)[0];
    if (updateCommentPost) {
      // Handle user
      const updateUser = await this.userRepository.findOne(updateCommentPostDTO.userId);
      if (updateUser) {
        updateCommentPost.user = updateUser;
      } else {
        throw new HttpException('userId ' + updateCommentPostDTO.userId + ' not found', HttpStatus.NOT_FOUND)
      }

      updateCommentPost.content = updateCommentPostDTO.content;
      updateCommentPost.edited = updateCommentPostDTO.edited;
      updateCommentPost.workedHours = updateCommentPostDTO.workedHours;

      await this.commentPostRepository.save(updateCommentPost);
      return await this.findOne(issueId);
    } else {
      throw new HttpException('commentPost id ' + id + ' not found for issue id ' + issueId, HttpStatus.NOT_FOUND)
    }
  }

  async update(id: number, updateIssueDTO: UpdateIssueDTO): Promise<Issue> {
    const updateIssue = await this.issueRepository.findOne(id);
    if (updateIssue) {
      updateIssue.verboseName = updateIssueDTO.verboseName;
      updateIssue.type = updateIssueDTO.type;
      updateIssue.description = updateIssueDTO.description;
      updateIssue.status = updateIssueDTO.status;
      updateIssue.priority = updateIssueDTO.priority;
      updateIssue.hoursEstimated = updateIssueDTO.hoursEstimated;
      updateIssue.hoursRemaining = updateIssueDTO.hoursRemaining;
      updateIssue.hoursSpent = updateIssueDTO.hoursSpent;
      updateIssue.gitLink = updateIssueDTO.gitLink;
      updateIssue.edited = updateIssueDTO.edited;
      updateIssue.resolved = updateIssueDTO.resolved;

      // Handle project
      const updateProject = await this.projectRepository.findOne(updateIssueDTO.projectId);
      if (updateProject) {
        updateIssue.project = updateProject;
      } else {
        throw new HttpException('projectId ' + updateIssueDTO.projectId + ' not found', HttpStatus.NOT_FOUND)
      }

      // Handle user
      const updateUser = await this.userRepository.findOne(updateIssueDTO.userId);
      if (updateUser) {
        updateIssue.user = updateUser;
      } else {
        throw new HttpException('userId ' + updateIssueDTO.userId + ' not found', HttpStatus.NOT_FOUND)
      }

      // Handle editedByUser
      if (updateIssueDTO.editedByUserId) {
        const updateEditedByUser = await this.userRepository.findOne(updateIssueDTO.editedByUserId);
        if (updateEditedByUser) {
          updateIssue.editedByUser = updateEditedByUser;
        } else {
          throw new HttpException('editedByUserId ' + updateIssueDTO.editedByUserId + ' not found', HttpStatus.NOT_FOUND)
        }
      }

      // Handle parent issue
      if (updateIssueDTO.parentIssueId) {
        const updateParentIssue = await this.issueRepository.findOne(updateIssueDTO.parentIssueId);
        if (updateParentIssue) {
          updateIssue.parentIssue = updateParentIssue;
        } else {
          throw new HttpException('parentIssueId ' + updateIssueDTO.parentIssueId + ' not found', HttpStatus.NOT_FOUND)
        }
      }

      // Handle child issues
      const updateChildIssues = updateIssueDTO.childIssueIds.length > 0 ? await this.issueRepository.findByIds(updateIssueDTO.childIssueIds) : [];
      const missingChildIssueIds = updateIssueDTO.childIssueIds.filter(item => updateChildIssues.map(i => i.id).indexOf(item) < 0);
      if (missingChildIssueIds.length === 0) {
        updateIssue.childIssues = updateChildIssues;
      } else {
        throw new HttpException('childIssueIds [' + missingChildIssueIds + '] not found', HttpStatus.NOT_FOUND);
      }

      // Handle comments
      const updateCommentPosts = updateIssueDTO.commentPostIds.length > 0 ? await this.commentPostRepository.findByIds(updateIssueDTO.commentPostIds) : [];
      const missingCommentPostIds = updateIssueDTO.commentPostIds.filter(item => updateCommentPosts.map(i => i.id).indexOf(item) < 0);
      if (missingCommentPostIds.length === 0) {
        updateIssue.commentPosts = updateCommentPosts;
      } else {
        throw new HttpException('commentPostIds [' + missingCommentPostIds + '] not found', HttpStatus.NOT_FOUND);
      }
      await this.issueRepository.save(updateIssue);
      return await this.findOne(id);

    } else {
      throw new HttpException('issueId ' + id + ' not found', HttpStatus.NOT_FOUND)
    }
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

    // Handle other
    issue.status = ISSUE_STATUSES.OPEN;
    issue.created = new Date();
    issue.name = await this.generateIssueName(project.prefix);

    await this.issueRepository.save(issue);
    return await this.findOne(issue.id);
  }

  private async generateIssueName(projectPrefix: string): Promise<string> {
    const result = (await this.issueRepository.query(HELPER_QUERIES.getMaxIssueNameSuffix))[0];
    return projectPrefix + '-' + (+result.max + 1);
  }


}