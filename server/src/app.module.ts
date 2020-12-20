import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import "reflect-metadata";
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { User } from './model/user.entity';
import { PermissionService } from './service/permission.service';
import { Permission } from './model/permission.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Preference } from './model/preference.entity';
import { Language } from './model/language.entity';
import { Project } from './model/project.entity';
import { Issue } from './model/issue.entity';
import { DocFolder } from './model/doc-folder.entity';
import { DocPage } from './model/doc-page.entity';
import { DocFolderService } from './service/doc-folder.service';
import { DocPageService } from './service/doc-page.service';
import { LanguageService } from './service/language.service';
import { PreferenceService } from './service/preference.service';
import { ProjectService } from './service/project.service';
import { IssueService } from './service/issue.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { IssueController } from './controller/issue.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true, 
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('TYPEORM_HOST'),
        port: configService.get('TYPEORM_PORT'),
        username: configService.get('TYPEORM_USERNAME'),
        password: configService.get('TYPEORM_PASSWORD'),
        database: configService.get('TYPEORM_DATABASE'),
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: configService.get('TYPEORM_SYNCHRONIZE'),
        migrationsRun: configService.get('TYPEORM_MIGRATIONS_RUN'),
        migrations: ["dist/migration/*.js"],
        dropSchema: true
      }),
    }),
    TypeOrmModule.forFeature([Project, DocFolder, DocPage, Issue, User, Permission, Preference, Language]),
    AuthModule,

  ],
  exports: [
    UserService, IssueService
  ],
  controllers: [AppController, UserController, IssueController],
  providers: [AppService, ConfigService, AuthService,
    ProjectService, DocFolderService, DocPageService, IssueService, UserService, PermissionService, PreferenceService, LanguageService],
})
export class AppModule { }
