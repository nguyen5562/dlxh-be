import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Response,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { GioiHanDonViService } from './gioi-han-don-vi.service';
import { CreateGioiHanDonViDTO } from './dto/create-gioi-han-don-vi.dto';
import { UpdateGioiHanDonViDTO } from './dto/update-gioi-han-don-vi.dto';
import { ApiResponse } from '../../helper/response.helper';
import { ResponseCode } from '../../const/response.const';
import { Pagination } from '../../decorators/pagination.decorator';
import { PaginationType } from '../../middleware/pagination.middleware';
import { PermissionsGuard } from '../../guards/permissions.guard';
import {
  ActionsPermission,
  ModulePermission,
} from '../../decorators/module-action.decorator';
import { ChucNangHeThong } from '../../enums/chuc-nang-he-thong.enum';
import { QuyenHeThong } from '../../enums/quyen-he-thong.enum';

// @UseGuards(PermissionsGuard)
@Controller('gioi-han-don-vi')
export class GioiHanDonViController {
  constructor(private readonly gioiHanDonViService: GioiHanDonViService) {}

  @ModulePermission(ChucNangHeThong.QuanLyKhaoSat)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Post()
  async create(
    @Body(ValidationPipe) createGioiHanDonViDto: CreateGioiHanDonViDTO,
    @Response() res,
  ) {
    const ans = await this.gioiHanDonViService.create(createGioiHanDonViDto);
    return ApiResponse(
      res,
      ResponseCode.CREATED,
      'Tạo giới hạn đơn vị thành công',
      ans,
    );
  }

  @Get()
  async findAll(@Response() res, @Pagination() pagination: PaginationType) {
    const { data, total } = await this.gioiHanDonViService.getAll(pagination);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy danh sách giới hạn đơn vị thành công',
      {
        danh_sach_gioi_han_don_vi: data,
        pagination: {
          page: pagination.page,
          size: pagination.limit,
          total,
          offset: pagination.skip,
        },
      },
    );
  }

  @Get('khao-sat/:maKhaoSat')
  async findByKhaoSat(
    @Param('maKhaoSat') maKhaoSat: string,
    @Response() res,
    @Pagination() pagination: PaginationType,
  ) {
    const { data, total } = await this.gioiHanDonViService.findByKhaoSat(
      maKhaoSat,
      pagination,
    );
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy danh sách giới hạn đơn vị theo khảo sát thành công',
      {
        danh_sach_gioi_han_don_vi: data,
        pagination: {
          page: pagination.page,
          size: pagination.limit,
          total,
          offset: pagination.skip,
        },
      },
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Response() res) {
    const ans = await this.gioiHanDonViService.getById(id);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy giới hạn đơn vị thành công',
      ans,
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateGioiHanDonViDto: UpdateGioiHanDonViDTO,
    @Response() res,
  ) {
    const ans = await this.gioiHanDonViService.update(
      id,
      updateGioiHanDonViDto,
    );
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Cập nhật giới hạn đơn vị thành công',
      ans,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Response() res) {
    await this.gioiHanDonViService.delete(id);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Xóa giới hạn đơn vị thành công',
    );
  }
}
