import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateVaiTroQuyenDTO {
  @IsMongoId()
  @IsNotEmpty()
  ma_vai_tro: string;

  @IsMongoId()
  @IsNotEmpty()
  ma_quyen: string;
}
