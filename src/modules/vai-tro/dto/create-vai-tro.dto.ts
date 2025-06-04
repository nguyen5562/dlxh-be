import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateVaiTroDTO {
  @IsString()
  @IsNotEmpty()
  ten_vai_tro: string;

  @IsString()
  @IsOptional()
  mo_ta?: string;
}
