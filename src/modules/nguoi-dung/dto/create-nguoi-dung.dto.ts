import {
  IsEmail,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Sex } from '../../../const/gioi-tinh.const';

export class CreateNguoiDungDTO {
  @IsString()
  @IsNotEmpty()
  ten_dang_nhap: string;

  @IsString()
  @IsNotEmpty()
  mat_khau: string;

  @IsString()
  @IsNotEmpty()
  ten_nguoi_dung: string;

  @IsIn(Sex)
  @IsString()
  @IsNotEmpty()
  gioi_tinh: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  sdt: string;

  @IsMongoId()
  @IsNotEmpty()
  ma_don_vi: string;

  @IsMongoId()
  @IsOptional()
  ma_vai_tro: string;
}
