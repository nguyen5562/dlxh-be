import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

export class ThongKeVungMienDTO {
  @IsString()
  _id: string;

  @IsString()
  ten_vung_mien: string;

  @IsNumber()
  so_phan_hoi: number;

  @IsString()
  ma_vung_mien_cha: string;

  @ValidateNested({ each: true })
  @Type(() => ThongKeVungMienDTO)
  cac_vung_mien_con: ThongKeVungMienDTO[];
}
