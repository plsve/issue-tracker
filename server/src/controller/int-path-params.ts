import { IsNumberString } from "class-validator";

export class IntPathParams {
    @IsNumberString({no_symbols: true})
    id: number;
  }
  