import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDonViDto {
  @IsString()
  @IsNotEmpty()
  ten_don_vi: string;

  @IsString()
  @IsNotEmpty()
  nganh: string;

  @IsMongoId()
  @IsOptional()
  ma_don_vi_cha: string;

  @IsMongoId()
  @IsOptional()
  ma_vung_mien: string;

  @IsString()
  @IsOptional()
  ma_phan_cap: string;
}
