import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateKhaoSatDTO {
  @IsString()
  @IsNotEmpty()
  tieu_de: string;

  @IsString()
  @IsNotEmpty()
  mo_ta: string;

  @IsMongoId()
  @IsNotEmpty()
  ma_nguoi_tao: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  thoi_gian_bat_dau: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @ValidateIf((o) => o.thoi_gian_bat_dau)
  thoi_gian_ket_thuc: Date;

  @IsNumber()
  @IsNotEmpty()
  gioi_han_phan_hoi: number;

  @IsBoolean()
  @IsOptional()
  cho_phep_tra_loi_nhieu_lan: boolean;

  @IsBoolean()
  @IsOptional()
  cho_phep_an_danh: boolean;

  @IsBoolean()
  @IsOptional()
  trang_thai: boolean;

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
