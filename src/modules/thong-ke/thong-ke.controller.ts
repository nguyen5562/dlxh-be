import { Body, Controller, Get, Query, Response } from '@nestjs/common';
import { ThongKeService } from './thong-ke.service';
import { ApiResponse } from '../../helper/response.helper';
import { ResponseCode } from '../../const/response.const';

@Controller('thong-ke')
export class ThongKeController {
  constructor(private readonly thongKeService: ThongKeService) {}

  @Get('don-vi')
  async thongKeByDonVi(
    @Response() res,
    @Query('ma_khao_sat') ma_khao_sat: string,
  ) {
    const ans =
      await this.thongKeService.thongKeSoPhanHoiTheoDonVi(ma_khao_sat);

    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Thống kê phản hồi của khảo sát theo đơn vị thành công',
      ans,
    );
  }

  @Get('vung-mien')
  async thongKeByVungMien(
    @Response() res,
    @Query('ma_khao_sat') ma_khao_sat: string,
  ) {
    const ans =
      await this.thongKeService.thongKeSoPhanHoiTheoVungMien(ma_khao_sat);

    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Thống kê phản hồi của khảo sát theo vùng miền thành công',
      ans,
    );
  }

  @Get('gioi-tinh')
  async thongKeByGioiTinh(
    @Response() res,
    @Query('ma_khao_sat') ma_khao_sat: string,
  ) {
    const ans =
      await this.thongKeService.thongKeSoPhanHoiTheoGioiTinh(ma_khao_sat);

    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Thống kê phản hồi của khảo sát theo giới tính thành công',
      ans,
    );
  }

  @Get('cau-hoi')
  async thongKeByCauHoi(
    @Response() res,
    @Query('ma_cau_hoi') ma_cau_hoi: string,
  ) {
    const ans = await this.thongKeService.thongKeTheoCauHoi(ma_cau_hoi);

    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Thống kê theo câu hỏi thành công',
      ans,
    );
  }
}
