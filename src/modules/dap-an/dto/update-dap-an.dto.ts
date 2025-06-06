import { IsIn, IsOptional, IsString } from 'class-validator';
import { LoaiDapAnSystem } from '../../../const/loai-dap-an.const';

export class UpdateDapAnDTO {
  @IsOptional()
  @IsString()
  gia_tri?: string;

  @IsOptional()
  @IsIn(LoaiDapAnSystem)
  loai_dap_an?: string;
}
