import {
  IsBoolean,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { LoaiCauHoiSystem } from '../../../const/loai-cau-hoi.const';

export class CreateCauHoiDto {
  @IsNotEmpty()
  @IsString()
  noi_dung: string;

  @IsNotEmpty()
  @IsIn(LoaiCauHoiSystem)
  loai_cau_hoi: string;

  @IsOptional()
  @IsBoolean()
  bat_buoc: boolean;

  @IsNotEmpty()
  @IsMongoId()
  ma_phan_khao_sat: string;
}
