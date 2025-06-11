import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Response,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { VungMienService } from './vung-mien.service';
import { ApiResponse } from '../../helper/response.helper';
import { ResponseCode } from '../../const/response.const';
import { CreateVungMienDTO } from './dto/create-vung-mien.dto';
import { UpdateVungMienDTO } from './dto/update-vung-mien.dto';
import { PermissionsGuard } from '../../guards/permissions.guard';
import {
  ModulePermission,
  ActionsPermission,
} from '../../decorators/module-action.decorator';
import { ChucNangHeThong } from '../../enums/chuc-nang-he-thong.enum';
import { QuyenHeThong } from '../../enums/quyen-he-thong.enum';
import { Pagination } from '../../decorators/pagination.decorator';
import { PaginationType } from '../../middleware/pagination.middleware';
import { Filter } from 'src/decorators/filter.pagination';
import { FilterType } from 'src/middleware/filter.middleware';

@UseGuards(PermissionsGuard)
@Controller('vung-mien')
export class VungMienController {
  constructor(private readonly vungMienService: VungMienService) {}

  @ModulePermission(ChucNangHeThong.QuanLyVungMien)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get()
  async getAllVungMiens(
    @Response() res,
    @Pagination() pagination: PaginationType,
    @Filter() filter: FilterType,
  ) {
    const { data, total } = await this.vungMienService.getAllVungMiens(
      filter,
      pagination,
    );

    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy danh sách vùng miền thành công',
      {
        danh_sach_vung_mien: data,
        pagination: {
          page: pagination.page,
          size: pagination.limit,
          total,
          offset: pagination.skip,
        },
      },
    );
  }

  @ModulePermission(ChucNangHeThong.QuanLyVungMien)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get(':id')
  async getVungMienById(@Param('id') id: string, @Response() res) {
    const ans = await this.vungMienService.getVungMienById(id);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy vùng miền thành công',
      ans,
    );
  }

  @ModulePermission(ChucNangHeThong.QuanLyVungMien)
  @ActionsPermission([QuyenHeThong.Edit])
  @Post()
  async createVungMien(
    @Body(ValidationPipe) createVungMienDto: CreateVungMienDTO,
    @Response() res,
  ) {
    const ans = await this.vungMienService.createVungMien(createVungMienDto);
    return ApiResponse(
      res,
      ResponseCode.CREATED,
      'Tạo vùng miền thành công',
      ans,
    );
  }

  @ModulePermission(ChucNangHeThong.QuanLyVungMien)
  @ActionsPermission([QuyenHeThong.Edit])
  @Put(':id')
  async updateVungMien(
    @Param('id') id: string,
    @Body(ValidationPipe) updateVungMienDto: UpdateVungMienDTO,
    @Response() res,
  ) {
    const ans = await this.vungMienService.updateVungMien(
      id,
      updateVungMienDto,
    );
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Cập nhật vùng miền thành công',
      ans,
    );
  }

  @ModulePermission(ChucNangHeThong.QuanLyVungMien)
  @ActionsPermission([QuyenHeThong.Edit])
  @Delete(':id')
  async deleteVungMien(@Param('id') id: string, @Response() res) {
    await this.vungMienService.deleteVungMien(id);
    return ApiResponse(res, ResponseCode.SUCCESS, 'Xóa vùng miền thành công');
  }
}
