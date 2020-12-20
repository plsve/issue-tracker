import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../model/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  findOne(id: string): Promise<Permission> {
    return this.permissionRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.permissionRepository.delete(id);
  }

  async save(permission: Permission): Promise<Permission> {
      return await this.permissionRepository.save(permission);
  }
}