import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

export class ThongKeDonViDTO {
  @IsString()
  _id: string;

  @IsString()
  ten_don_vi: string;

  @IsNumber()
  so_phan_hoi: number;

  @IsString()
  ma_don_vi_cha: string | null;

  @ValidateNested({ each: true })
  @Type(() => ThongKeDonViDTO)
  cac_don_vi_con: ThongKeDonViDTO[];
}
