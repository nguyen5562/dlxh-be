import { IsEmail, IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateNguoiDungDTO {
  @IsString()
  @IsOptional()
  ten_dang_nhap?: string;

  @IsString()
  @IsOptional()
  ten_nguoi_dung?: string;

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
