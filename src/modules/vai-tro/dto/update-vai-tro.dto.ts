import { IsOptional, IsString } from 'class-validator';

export class UpdateVaiTroDTO {
  @IsString()
  @IsOptional()
  ten_vai_tro?: string;

  @IsString()
  @IsOptional()
  mo_ta?: string;
}
