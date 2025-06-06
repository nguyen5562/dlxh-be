import { IsNumber, IsOptional } from 'class-validator';

export class UpdateGioiHanVungMienDTO {
  @IsNumber()
  @IsOptional()
  so_luong_phan_hoi_toi_da?: number;
}
