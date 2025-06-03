import { IsIn, IsOptional, IsString } from 'class-validator';
import { LoaiDapAnSystem } from 'src/const/loai-dap-an.const';

export class UpdateDapAnDto {
  @IsOptional()
  @IsString()
  gia_tri?: string;

  @IsOptional()
  @IsIn(LoaiDapAnSystem)
  loai_dap_an?: string;
}
