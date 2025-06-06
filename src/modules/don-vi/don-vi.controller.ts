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
import { DonViService } from './don-vi.service';
import { ApiResponse } from '../../helper/response.helper';
import { ResponseCode } from '../../const/response.const';
import { CreateDonViDTO } from './dto/create-don-vi.dto';
import { UpdateDonViDTO } from './dto/update-don-vi.dto';
import { PermissionsGuard } from '../../guards/permissions.guard';
import {
  ModulePermission,
  ActionsPermission,
} from '../../decorators/module-action.decorator';
import { ChucNangHeThong } from '../../enums/chuc-nang-he-thong.enum';
import { QuyenHeThong } from '../../enums/quyen-he-thong.enum';
import { Pagination } from '../../decorators/pagination.decorator';
import { PaginationType } from '../../middleware/pagination.middleware';

// @UseGuards(PermissionsGuard)
@Controller('don-vi')
export class DonViController {
  constructor(private readonly donViService: DonViService) {}

  @ModulePermission(ChucNangHeThong.QuanLyDonVi)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get()
  async getAllDonVis(
    @Response() res,
    @Pagination() pagination: PaginationType,
  ) {
    const { data, total } = await this.donViService.getAllDonVis(pagination);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy danh sách đơn vị thành công',
      {
        danh_sach_don_vi: data,
        pagination: {
          page: pagination.page,
          size: pagination.limit,
          total,
          offset: pagination.skip,
        },
      },
    );
  }

  @ModulePermission(ChucNangHeThong.QuanLyDonVi)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get(':id')
  async getDonViById(@Param('id') id: string, @Response() res) {
    const ans = await this.donViService.getDonViById(id);
    return ApiResponse(res, ResponseCode.SUCCESS, 'Lấy đơn vị thành công', ans);
  }

  @ModulePermission(ChucNangHeThong.QuanLyDonVi)
  @ActionsPermission([QuyenHeThong.Edit])
  @Post()
  async createDonVi(
    @Body(ValidationPipe) createDonViDto: CreateDonViDTO,
    @Response() res,
  ) {
    const ans = await this.donViService.createDonVi(createDonViDto);
    return ApiResponse(res, ResponseCode.CREATED, 'Tạo đơn vị thành công', ans);
  }

  @ModulePermission(ChucNangHeThong.QuanLyDonVi)
  @ActionsPermission([QuyenHeThong.Edit])
  @Put(':id')
  async updateDonVi(
    @Param('id') id: string,
    @Body(ValidationPipe) updateDonViDto: UpdateDonViDTO,
    @Response() res,
  ) {
    const ans = await this.donViService.updateDonVi(id, updateDonViDto);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Cập nhật đơn vị thành công',
      ans,
    );
  }

  @ModulePermission(ChucNangHeThong.QuanLyDonVi)
  @ActionsPermission([QuyenHeThong.Edit])
  @Delete(':id')
  async deleteDonVi(@Param('id') id: string, @Response() res) {
    await this.donViService.deleteDonVi(id);
    return ApiResponse(res, ResponseCode.SUCCESS, 'Xóa đơn vị thành công');
  }
}
