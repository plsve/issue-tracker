import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { DocFolder } from 'src/model/doc-folder.entity';
import { DocPage } from 'src/model/doc-page.entity';
import { Issue } from 'src/model/issue.entity';
import { Language } from 'src/model/language.entity';
import { Permission } from 'src/model/permission.entity';
import { Preference } from 'src/model/preference.entity';
import { Project } from 'src/model/project.entity';
import { User } from 'src/model/user.entity';
import { DocFolderService } from 'src/service/doc-folder.service';
import { DocPageService } from 'src/service/doc-page.service';
import { IssueService } from 'src/service/issue.service';
import { LanguageService } from 'src/service/language.service';
import { PermissionService } from 'src/service/permission.service';
import { PreferenceService } from 'src/service/preference.service';
import { ProjectService } from 'src/service/project.service';
import { UserService } from 'src/service/user.service';
import { CommentPostService } from 'src/service/comment-post.service';
import { CommentPost } from 'src/model/comment-post.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRATION_TIME') },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Project, DocFolder, DocPage, Issue, User, Permission, Preference, Language, CommentPost]),
  ],

  providers: [
    AuthService, LocalStrategy, JwtStrategy,
    UserService, ProjectService, DocFolderService, DocPageService, IssueService, PermissionService, PreferenceService, LanguageService, CommentPostService
  ],
  exports: [JwtModule]
})
export class AuthModule { }