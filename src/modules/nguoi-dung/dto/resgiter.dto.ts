import {
  IsEmail,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Sex } from '../../../const/gioi-tinh.const';

export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  ten_nguoi_dung: string;

  @IsIn(Sex)
  @IsString()
  @IsNotEmpty()
  gioi_tinh: string;

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
