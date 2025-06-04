import { IsOptional, IsString } from 'class-validator';

export class UpdatePhanKhaoSatDTO {
  @IsString()
  @IsOptional()
  tieu_de?: string;

  @IsString()
  @IsOptional()
  mo_ta?: string;
}
