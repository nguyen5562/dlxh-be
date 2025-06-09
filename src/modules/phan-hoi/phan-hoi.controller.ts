import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Response,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PhanHoiService } from './phan-hoi.service';
import { CreatePhanHoiDTO } from './dto/create-phan-hoi.dto';
import { ApiResponse } from '../../helper/response.helper';
import { ResponseCode } from '../../const/response.const';
import { CreatePhanHoiDetailDTO } from './dto/create-phan-hoi-detail.dto';
import {
  ActionsPermission,
  ModulePermission,
} from '../../decorators/module-action.decorator';
import { ChucNangHeThong } from '../../enums/chuc-nang-he-thong.enum';
import { PermissionsGuard } from '../../guards/permissions.guard';
import { QuyenHeThong } from '../../enums/quyen-he-thong.enum';
import { Pagination } from '../../decorators/pagination.decorator';
import { PaginationType } from '../../middleware/pagination.middleware';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('phan-hoi')
export class PhanHoiController {
  constructor(private readonly phanHoiService: PhanHoiService) {}

  @UseGuards(PermissionsGuard)
  @ModulePermission(ChucNangHeThong.QuanLyPhanHoi)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get()
  async getAllPhanHoi(
    @Response() res,
    @Pagination() pagination: PaginationType,
  ) {
    const { data, total } = await this.phanHoiService.getAllPhanHoi(pagination);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy tất cả phản hồi thành công',
      {
        danh_sach_phan_hoi: data,
        pagination: {
          page: pagination.page,
          size: pagination.limit,
          total,
          offset: pagination.skip,
        },
      },
    );
  }

  @UseGuards(PermissionsGuard)
  @ModulePermission(ChucNangHeThong.QuanLyPhanHoi)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get(':id')
  async getPhanHoiById(@Param('id') id: string, @Response() res) {
    const ans = await this.phanHoiService.getPhanHoiById(id);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy phản hồi thành công',
      ans,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPhanHoi(
    @Body(ValidationPipe) createPhanHoiDto: CreatePhanHoiDTO,
    @Response() res,
  ) {
    const ans = await this.phanHoiService.createPhanHoi(createPhanHoiDto);
    return ApiResponse(
      res,
      ResponseCode.CREATED,
      'Tạo phản hồi thành công',
      ans,
    );
  }

  @UseGuards(PermissionsGuard)
  @ModulePermission(ChucNangHeThong.QuanLyPhanHoi)
  @ActionsPermission([QuyenHeThong.Edit])
  @Delete(':id')
  async deletePhanHoi(@Param('id') id: string, @Response() res) {
    await this.phanHoiService.deletePhanHoi(id);
    return ApiResponse(res, ResponseCode.SUCCESS, 'Xóa phản hồi thành công');
  }

  @UseGuards(JwtAuthGuard)
  @Post('detail')
  async createPhanHoiDetail(
    @Body(ValidationPipe) createPhanHoiDetailDto: CreatePhanHoiDetailDTO,
    @Response() res,
  ) {
    const ans = await this.phanHoiService.createPhanHoiDetail(
      createPhanHoiDetailDto,
    );

    return ApiResponse(
      res,
      ResponseCode.CREATED,
      'Tạo phản hồi chi tiết thành công',
      ans,
    );
  }

  @ModulePermission(ChucNangHeThong.QuanLyPhanHoi)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get('chi-tiet/:id')
  async getPhanHoiDetailById(@Param('id') id: string, @Response() res) {
    const ans = await this.phanHoiService.getPhanHoiDetailById(id);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy phản hồi chi tiết thành công',
      ans,
    );
  }

  @ModulePermission(ChucNangHeThong.QuanLyPhanHoi)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get('nguoi-dung/:id')
  async getDanhSachNguoiDungDaPhanHoi(
    @Param('id') id: string,
    @Response() res,
    @Pagination() pagination: PaginationType,
  ) {
    const { data, total } =
      await this.phanHoiService.getDanhSachNguoiDungDaPhanHoi(id, pagination);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy danh sách người dùng đã phản hồi thành công',
      {
        danh_sach_da_phan_hoi: data,
        pagination: {
          page: pagination.page,
          size: pagination.limit,
          total,
          offset: pagination.skip,
        },
      },
    );
  }
}
