import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateVaiTroDto {
  @IsString()
  @IsNotEmpty()
  ten_vai_tro: string;

  @IsString()
  @IsOptional()
  mo_ta?: string;
}
