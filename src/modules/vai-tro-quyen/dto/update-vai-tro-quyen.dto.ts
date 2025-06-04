import { IsOptional, IsMongoId } from 'class-validator';

export class UpdateVaiTroQuyenDTO {
  @IsMongoId()
  @IsOptional()
  ma_vai_tro?: string;

  @IsMongoId()
  @IsOptional()
  ma_quyen?: string;
}
