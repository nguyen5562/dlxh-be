import { IsEmail, IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateNguoiDungDto {
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
  ma_vai_tro?: string;
}
