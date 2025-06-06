import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  ten_nguoi_dung: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  sdt: string;

  @IsMongoId()
  @IsNotEmpty()
  ma_don_vi: string;
}
