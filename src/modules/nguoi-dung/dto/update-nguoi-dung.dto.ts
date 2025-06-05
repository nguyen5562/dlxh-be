import { IsEmail, IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateNguoiDungDTO {
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
