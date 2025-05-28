import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  ten_nhom: string;

  @IsString()
  @IsOptional()
  mo_ta?: string;
}
