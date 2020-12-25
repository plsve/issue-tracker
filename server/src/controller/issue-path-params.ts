import { IsNumberString } from "class-validator";
import { IntPathParams } from "./int-path-params";

export class IssuePathParams extends IntPathParams {

    @IsNumberString({no_symbols: true})
    issueId: number;
}