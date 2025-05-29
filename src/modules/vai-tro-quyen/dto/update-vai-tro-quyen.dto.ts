import { IsOptional, IsMongoId } from 'class-validator';

export class UpdateVaiTroQuyenDto {
  @IsMongoId()
  @IsOptional()
  ma_vai_tro?: string;

  @IsMongoId()
  @IsOptional()
  ma_quyen?: string;
}
