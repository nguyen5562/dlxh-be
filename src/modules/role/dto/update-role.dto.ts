import { IsOptional, IsString } from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  @IsOptional()
  ten_nhom?: string;

  @IsString()
  @IsOptional()
  mo_ta?: string;
}
