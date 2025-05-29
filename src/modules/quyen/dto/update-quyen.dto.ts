import { IsIn, IsOptional, IsString } from 'class-validator';
import { ChucNangSystem, QuyenSystem } from 'src/const/quyen.const';

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
