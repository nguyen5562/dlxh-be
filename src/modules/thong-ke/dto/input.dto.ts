import { IsNotEmpty, IsString } from 'class-validator';

export class InputDTO {
  @IsString()
  @IsNotEmpty()
  ma_khao_sat: string;
}
