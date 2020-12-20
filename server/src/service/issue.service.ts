import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Issue } from '../model/issue.entity';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(Issue)
    private issueRepository: Repository<Issue>,
  ) {}

  findAll(): Promise<Issue[]> {
    return this.issueRepository.find();
  }

  findOne(id: string): Promise<Issue> {
    return this.issueRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.issueRepository.delete(id);
  }

  async save(issue: Issue): Promise<Issue> {
      return await this.issueRepository.save(issue);
  }
}