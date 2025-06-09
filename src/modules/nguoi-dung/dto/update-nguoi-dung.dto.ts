import {
  IsEmail,
  IsIn,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { Sex } from '../../../const/gioi-tinh.const';

export class UpdateNguoiDungDTO {
  @IsString()
  @IsOptional()
  ten_dang_nhap?: string;

  @IsString()
  @IsOptional()
  ten_nguoi_dung?: string;

  @IsIn(Sex)
  @IsString()
  @IsOptional()
  gioi_tinh?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  sdt?: string;

  @IsMongoId()
  @IsOptional()
  ma_don_vi?: string;

  @IsMongoId()
  @IsOptional()
  ma_vai_tro?: string;
}
