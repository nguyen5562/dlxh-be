import { IsMongoId, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateGioiHanVungMienDTO {
  @IsMongoId()
  @IsNotEmpty()
  ma_khao_sat: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  ma_vung_mien: Types.ObjectId;

  @IsNumber()
  @IsOptional()
  so_luong_phan_hoi_toi_da: number;
}
