import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreatePhanKhaoSatDTO {
  @IsString()
  @IsNotEmpty()
  tieu_de: string;

  @IsString()
  @IsNotEmpty()
  mo_ta: string;

  @IsMongoId()
  @IsNotEmpty()
  ma_khao_sat: string;
}
