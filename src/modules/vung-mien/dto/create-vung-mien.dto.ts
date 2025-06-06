import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVungMienDTO {
  @IsString()
  @IsNotEmpty()
  ten_vung_mien: string;

  @IsMongoId()
  @IsOptional()
  ma_vung_mien_cha: string;

  @IsString()
  @IsOptional()
  ma_phan_cap: string;
}
