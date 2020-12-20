import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserService } from 'src/service/user.service';
import { DocFolderService } from 'src/service/doc-folder.service';
import { DocPageService } from 'src/service/doc-page.service';
import { LanguageService } from 'src/service/language.service';
import { PermissionService } from 'src/service/permission.service';
import { PreferenceService } from 'src/service/preference.service';
import { ProjectService } from 'src/service/project.service';
import { IssueService } from 'src/service/issue.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocFolder } from 'src/model/doc-folder.entity';
import { DocPage } from 'src/model/doc-page.entity';
import { Language } from 'src/model/language.entity';
import { Permission } from 'src/model/permission.entity';
import { Preference } from 'src/model/preference.entity';
import { Project } from 'src/model/project.entity';
import { Issue } from 'src/model/issue.entity';
import { User } from 'src/model/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

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
    TypeOrmModule.forFeature([Project, DocFolder, DocPage, Issue, User, Permission, Preference, Language]),
  ],

  providers: [
    AuthService, LocalStrategy, JwtStrategy,
    UserService, ProjectService, DocFolderService, DocPageService, IssueService, PermissionService, PreferenceService, LanguageService
  ],
  exports: [JwtModule]
})
export class AuthModule { }