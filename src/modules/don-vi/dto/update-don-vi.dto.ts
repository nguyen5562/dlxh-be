import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateDonViDTO {
  @IsString()
  @IsOptional()
  ten_don_vi?: string;

  @IsString()
  @IsOptional()
  nganh?: string;

  @IsMongoId()
  @IsOptional()
  ma_vung_mien?: string;

  @IsMongoId()
  @IsOptional()
  ma_don_vi_cha?: string;

  @IsString()
  @IsOptional()
  ma_phan_cap?: string;
}
