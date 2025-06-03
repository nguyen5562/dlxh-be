import { IsIn, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { LoaiDapAnSystem } from 'src/const/loai-dap-an.const';

export class CreateDapAnDto {
  @IsNotEmpty()
  @IsString()
  gia_tri: string;

  @IsNotEmpty()
  @IsIn(LoaiDapAnSystem)
  loai_dap_an: string;

  @IsNotEmpty()
  @IsMongoId()
  ma_cau_hoi: string;
}
