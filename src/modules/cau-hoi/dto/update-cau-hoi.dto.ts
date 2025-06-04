import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';
import { LoaiCauHoiSystem } from '../../../const/loai-cau-hoi.const';

export class UpdateCauHoiDTO {
  @IsOptional()
  @IsString()
  noi_dung?: string;

  @IsOptional()
  @IsIn(LoaiCauHoiSystem)
  loai_cau_hoi?: string;

  @IsOptional()
  @IsBoolean()
  bat_buoc?: boolean;
}
