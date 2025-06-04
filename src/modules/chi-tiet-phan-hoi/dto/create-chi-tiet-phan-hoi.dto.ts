import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateChiTietPhanHoiDTO {
  @IsMongoId()
  @IsNotEmpty()
  ma_phan_hoi: string;

  @IsMongoId()
  @IsNotEmpty()
  ma_cau_hoi: string;

  @IsMongoId()
  @IsOptional()
  ma_dap_an: string;

  @IsString()
  @IsOptional()
  tra_loi: string;
}
