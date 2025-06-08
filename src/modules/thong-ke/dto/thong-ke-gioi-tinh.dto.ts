import { IsNumber } from 'class-validator';

export class ThongKeGioiTinhDTO {
  @IsNumber()
  nam: number;

  @IsNumber()
  nu: number;

  @IsNumber()
  an_danh: number;

  @IsNumber()
  tong_cong: number;
}
