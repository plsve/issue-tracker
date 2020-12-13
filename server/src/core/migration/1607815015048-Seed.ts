import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { CommendPostSeed } from "../db-seed/comment-post.seed";
import { DocFolderSeed } from "../db-seed/doc-folder.seed";
import { DocPageSeed } from "../db-seed/doc-page.seed";
import { LanguageSeed } from "../db-seed/language.seed";
import { PermissionSeed } from "../db-seed/permission.seed";
import { PersonSeed } from "../db-seed/person.seed";
import { PreferenceSeed } from "../db-seed/preference.seed";
import { ProjectSeed } from "../db-seed/project.seed";
import { TaskSeed } from "../db-seed/task.seed";

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
        
        await getRepository('person').save(
            PersonSeed
        );

        await getRepository('task').save(
            TaskSeed
        );

        await getRepository('comment_post').save(
            CommendPostSeed
        );

        await getRepository('permission').save(
            PermissionSeed
        );
        

        

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
