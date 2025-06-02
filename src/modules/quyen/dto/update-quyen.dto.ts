import { IsIn, IsOptional, IsString } from 'class-validator';
import { ChucNangSystem, QuyenSystem } from '../../../const/quyen.const';

export class UpdateQuyenDto {
  @IsString()
  @IsOptional()
  @IsIn(ChucNangSystem)
  chuc_nang?: string;

  @IsString()
  @IsOptional()
  @IsIn(QuyenSystem)
  quyen?: string;
}
