import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import "reflect-metadata";
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserController } from './core/controller/user.controller';
import { UserService } from './core/service/user.service';
import { User } from './core/model/user.entity';
import { PermissionService } from './core/service/permission.service';
import { Permission } from './core/model/permission.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Preference } from './core/model/preference.entity';
import { Language } from './core/model/language.entity';
import { Project } from './core/model/project.entity';
import { Issue } from './core/model/issue.entity';
import { DocFolder } from './core/model/doc-folder.entity';
import { DocPage } from './core/model/doc-page.entity';
import { DocFolderService } from './core/service/doc-folder.service';
import { DocPageService } from './core/service/doc-page.service';
import { LanguageService } from './core/service/language.service';
import { PreferenceService } from './core/service/preference.service';
import { ProjectService } from './core/service/project.service';
import { IssueService } from './core/service/issue.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';

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
        migrations: ["dist/core/migration/*.js"]
      }),
    }),
    TypeOrmModule.forFeature([Project, DocFolder, DocPage, Issue, User, Permission, Preference, Language]),
    AuthModule,

  ],
  exports: [
    UserService
  ],
  controllers: [AppController, UserController],
  providers: [AppService, ConfigService, AuthService,
    ProjectService, DocFolderService, DocPageService, IssueService, UserService, PermissionService, PreferenceService, LanguageService],
})
export class AppModule { }
