import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentPost } from 'src/model/comment-post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentPostService {
  constructor(
    @InjectRepository(CommentPost)
    private commentPostRepository: Repository<CommentPost>,
  ) {}

  findAll(): Promise<CommentPost[]> {
    return this.commentPostRepository.find();
  }

  findOne(id: string): Promise<CommentPost> {
    return this.commentPostRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.commentPostRepository.delete(id);
  }

  async save(commentPost: CommentPost): Promise<CommentPost> {
      return await this.commentPostRepository.save(commentPost);
  }
}