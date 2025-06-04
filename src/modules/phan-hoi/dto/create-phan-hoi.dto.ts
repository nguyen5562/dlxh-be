import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePhanHoiDTO {
  @IsMongoId()
  @IsNotEmpty()
  ma_khao_sat: string;

  @IsMongoId()
  @IsOptional()
  ma_nguoi_dung: string;

  @IsString()
  @IsOptional()
  ghi_chu: string;
}
