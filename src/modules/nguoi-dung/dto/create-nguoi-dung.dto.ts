import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  sdt: string;
}
