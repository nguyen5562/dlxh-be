import { IsOptional, IsString } from 'class-validator';

export class UpdateVungMienDto {
  @IsString()
  @IsOptional()
  ten_vung_mien?: string;
}
