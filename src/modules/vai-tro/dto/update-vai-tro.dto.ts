import { IsOptional, IsString } from 'class-validator';

export class UpdateVaiTroDto {
  @IsString()
  @IsOptional()
  ten_vai_tro?: string;

  @IsString()
  @IsOptional()
  mo_ta?: string;
}
