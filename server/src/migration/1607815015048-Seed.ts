import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { CommendPostSeed } from "../db-seed/comment-post.seed";
import { DocFolderSeed } from "../db-seed/doc-folder.seed";
import { DocPageSeed } from "../db-seed/doc-page.seed";
import { LanguageSeed } from "../db-seed/language.seed";
import { PermissionSeed } from "../db-seed/permission.seed";
import { PreferenceSeed } from "../db-seed/preference.seed";
import { ProjectSeed } from "../db-seed/project.seed";
import { IssueSeed } from "../db-seed/issue.seed";
import { UserSeed } from "../db-seed/user.seed";

export class Seed1607815015048 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await getRepository('language').save(
            LanguageSeed
        );
        
        await getRepository('preference').save(
            PreferenceSeed
        );

        await getRepository('project').save(
            ProjectSeed
        );

        await getRepository('doc_folder').save(
            DocFolderSeed
        );

        await getRepository('doc_page').save(
            DocPageSeed
        );

        await getRepository('permission').save(
            PermissionSeed
        );
        
        await getRepository('user').save(
            UserSeed
        );

        await getRepository('issue').save(
            IssueSeed
        );

        await getRepository('comment_post').save(
            CommendPostSeed
        );


        

        

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
