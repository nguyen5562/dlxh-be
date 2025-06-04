import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateVungMienDTO {
  @IsString()
  @IsOptional()
  ten_vung_mien?: string;

  @IsMongoId()
  @IsOptional()
  ma_vung_mien_cha?: string;

  @IsString()
  @IsOptional()
  ma_phan_cap?: string;
}
