import { IsOptional, IsString } from 'class-validator';

export class UpdatePhanKhaoSatDto {
  @IsString()
  @IsOptional()
  tieu_de?: string;

  @IsString()
  @IsOptional()
  mo_ta?: string;
}
