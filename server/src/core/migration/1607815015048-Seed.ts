import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { LanguageSeed } from "../db-seed/language.seed";
import { PermissionSeed } from "../db-seed/permission.seed";
import { PersonSeed } from "../db-seed/person.seed";
import { PreferenceSeed } from "../db-seed/preference.seed";

export class Seed1607815015048 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        const languages = await getRepository('language').save(
            LanguageSeed
        )
        
        await getRepository('preference').save(
            PreferenceSeed
        )
        
        await getRepository('person').save(
            PersonSeed
        )
        
        await getRepository('permission').save(
            PermissionSeed
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
