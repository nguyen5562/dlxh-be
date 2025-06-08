import { Controller, Get, Response } from '@nestjs/common';
import { ThongKeService } from './thong-ke.service';
import { ApiResponse } from 'src/helper/response.helper';
import { ResponseCode } from 'src/const/response.const';

@Controller('thong-ke')
export class ThongKeController {
  constructor(private readonly thongKeService: ThongKeService) {}

  @Get('don-vi')
  async thongKeByDonVi(@Response() res, maKhaoSat: string) {
    const ans = await this.thongKeService.thongKeSoPhanHoiTheoDonVi(maKhaoSat);

    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Thống kê phản hồi của khảo sát theo đơn vị thành công',
      ans,
    );
  }

  @Get('vung-mien')
  async thongKeByVungMien(@Response() res, maKhaoSat: string) {
    const ans =
      await this.thongKeService.thongKeSoPhanHoiTheoVungMien(maKhaoSat);

    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Thống kê phản hồi của khảo sát theo vùng miền thành công',
      ans,
    );
  }

  @Get('gioi-tinh')
  async thongKeByGioiTinh(@Response() res, maKhaoSat: string) {
    const ans =
      await this.thongKeService.thongKeSoPhanHoiTheoGioiTinh(maKhaoSat);

    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Thống kê phản hồi của khảo sát theo giới tính thành công',
      ans,
    );
  }
}
