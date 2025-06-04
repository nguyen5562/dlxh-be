import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { ChucNangSystem, QuyenSystem } from '../../../const/quyen.const';

export class CreateQuyenDTO {
  @IsString()
  @IsNotEmpty()
  @IsIn(ChucNangSystem)
  chuc_nang: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(QuyenSystem)
  quyen: string;
}
