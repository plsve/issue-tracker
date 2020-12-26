import { IsNumberString } from "class-validator";
import { IntPathParams } from "./int-path-params";

export class DocPagePathParams extends IntPathParams {

    @IsNumberString({no_symbols: true})
    folderId: number;
}