import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreatePhanHoiDTO } from './create-phan-hoi.dto';
import { Type } from 'class-transformer';

export class CreateChiTietDTO {
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

export class CreatePhanHoiDetailDTO extends CreatePhanHoiDTO {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateChiTietDTO)
  chi_tiet_phan_hoi: CreateChiTietDTO[];
}
