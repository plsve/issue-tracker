import { IsNumberString, IsOptional } from "class-validator";

export class IntPathParams {
    @IsNumberString({no_symbols: true})
    id: number;
  }
  