import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateDonViDto {
  @IsString()
  @IsOptional()
  ten_don_vi?: string;

  @IsString()
  @IsOptional()
  nganh?: string;

  @IsMongoId()
  @IsOptional()
  ma_vung_mien?: string;
}
