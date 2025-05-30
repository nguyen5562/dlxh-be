import { IsEmail, IsOptional, IsString } from 'class-validator';

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
}
