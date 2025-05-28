import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  ten_dang_nhap: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  mat_khau: string;

  @IsString()
  @IsNotEmpty()
  ten_nguoi_dung: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  so_dien_thoai: string;
}
