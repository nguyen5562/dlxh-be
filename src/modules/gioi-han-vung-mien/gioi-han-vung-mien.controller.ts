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
import { GioiHanVungMienService } from './gioi-han-vung-mien.service';
import { CreateGioiHanVungMienDTO } from './dto/create-gioi-han-vung-mien.dto';
import { UpdateGioiHanVungMienDTO } from './dto/update-gioi-han-vung-mien.dto';
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

@UseGuards(PermissionsGuard)
@Controller('gioi-han-vung-mien')
export class GioiHanVungMienController {
  constructor(
    private readonly gioiHanVungMienService: GioiHanVungMienService,
  ) {}

  @ModulePermission(ChucNangHeThong.QuanLyKhaoSat)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Post()
  async create(
    @Body(ValidationPipe) createGioiHanVungMienDto: CreateGioiHanVungMienDTO,
    @Response() res,
  ) {
    const ans = await this.gioiHanVungMienService.create(
      createGioiHanVungMienDto,
    );
    return ApiResponse(
      res,
      ResponseCode.CREATED,
      'Tạo giới hạn vùng miền thành công',
      ans,
    );
  }

  @Get()
  async findAll(@Response() res, @Pagination() pagination: PaginationType) {
    const { data, total } =
      await this.gioiHanVungMienService.getAll(pagination);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy danh sách giới hạn vùng miền thành công',
      {
        danh_sach_gioi_han_vung_mien: data,
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
    const { data, total } = await this.gioiHanVungMienService.findByKhaoSat(
      maKhaoSat,
      pagination,
    );
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy danh sách giới hạn vùng miền theo khảo sát thành công',
      {
        danh_sach_gioi_han_vung_mien: data,
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
    const ans = await this.gioiHanVungMienService.getById(id);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy giới hạn vùng miền thành công',
      ans,
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateGioiHanVungMienDto: UpdateGioiHanVungMienDTO,
    @Response() res,
  ) {
    const ans = await this.gioiHanVungMienService.update(
      id,
      updateGioiHanVungMienDto,
    );
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Cập nhật giới hạn vùng miền thành công',
      ans,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Response() res) {
    await this.gioiHanVungMienService.delete(id);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Xóa giới hạn vùng miền thành công',
    );
  }
}
