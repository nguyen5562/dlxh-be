import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UpdateKhaoSatDto {
  @IsString()
  @IsOptional()
  tieu_de?: string;

  @IsString()
  @IsOptional()
  mo_ta?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  thoi_gian_bat_dau?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  @ValidateIf((o) => o.thoi_gian_bat_dau)
  thoi_gian_ket_thuc?: Date;

  @IsNumber()
  @IsOptional()
  gioi_han_phan_hoi?: number;

  @IsBoolean()
  @IsOptional()
  cho_phep_tra_loi_nhieu_lan?: boolean;

  @IsBoolean()
  @IsOptional()
  cho_phep_an_danh?: boolean;

  @IsBoolean()
  @IsOptional()
  trang_thai?: boolean;

  constructor() {
    const now = new Date();

    if (this.thoi_gian_bat_dau) {
      if (this.thoi_gian_bat_dau <= now) {
        throw new Error('Thời gian bắt đầu phải lớn hơn thời gian hiện tại');
      }

      if (this.thoi_gian_ket_thuc) {
        if (this.thoi_gian_ket_thuc <= this.thoi_gian_bat_dau) {
          throw new Error('Thời gian kết thúc phải lớn hơn thời gian bắt đầu');
        }
      }
    }
  }
}
