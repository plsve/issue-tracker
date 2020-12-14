import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserService } from 'src/core/service/user.service';
import { DocFolderService } from 'src/core/service/doc-folder.service';
import { DocPageService } from 'src/core/service/doc-page.service';
import { LanguageService } from 'src/core/service/language.service';
import { PermissionService } from 'src/core/service/permission.service';
import { PreferenceService } from 'src/core/service/preference.service';
import { ProjectService } from 'src/core/service/project.service';
import { TaskService } from 'src/core/service/task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocFolder } from 'src/core/model/doc-folder.entity';
import { DocPage } from 'src/core/model/doc-page.entity';
import { Language } from 'src/core/model/language.entity';
import { Permission } from 'src/core/model/permission.entity';
import { Preference } from 'src/core/model/preference.entity';
import { Project } from 'src/core/model/project.entity';
import { Task } from 'src/core/model/task.entity';
import { User } from 'src/core/model/user.entity';
import { JwtModule, JwtService, JwtModuleOptions } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30s' },
    }),
    TypeOrmModule.forFeature([Project, DocFolder, DocPage, Task, User, Permission, Preference, Language]),],
  providers: [
    AuthService, LocalStrategy,
    UserService, ProjectService, DocFolderService, DocPageService, TaskService, PermissionService, PreferenceService, LanguageService
  ],
  exports: [JwtModule]
})
export class AuthModule { }