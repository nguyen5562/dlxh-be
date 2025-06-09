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
import { KhaoSatService } from './khao-sat.service';
import { CreateKhaoSatDTO } from './dto/create-khao-sat.dto';
import { UpdateKhaoSatDTO } from './dto/update-khao-sat.dto';
import { ApiResponse } from '../../helper/response.helper';
import { ResponseCode } from '../../const/response.const';
import { PermissionsGuard } from '../../guards/permissions.guard';
import { ModulePermission } from '../../decorators/module-action.decorator';
import { ActionsPermission } from '../../decorators/module-action.decorator';
import { QuyenHeThong } from '../../enums/quyen-he-thong.enum';
import { ChucNangHeThong } from '../../enums/chuc-nang-he-thong.enum';
import { Pagination } from '../../decorators/pagination.decorator';
import { PaginationType } from '../../middleware/pagination.middleware';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('khao-sat')
export class KhaoSatController {
  constructor(private readonly khaoSatService: KhaoSatService) {}

  @UseGuards(PermissionsGuard)
  @ModulePermission(ChucNangHeThong.QuanLyKhaoSat)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get()
  async getAllKhaoSat(
    @Response() res,
    @Pagination() pagination: PaginationType,
  ) {
    const { data, total } = await this.khaoSatService.getAllKhaoSat(pagination);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy danh sách khảo sát thành công',
      {
        danh_sach_khao_sat: data,
        pagination: {
          page: pagination.page,
          size: pagination.limit,
          total,
          offset: pagination.skip,
        },
      },
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getKhaoSatById(@Param('id') id: string, @Response() res) {
    const ans = await this.khaoSatService.getKhaoSatById(id);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy khảo sát thành công',
      ans,
    );
  }

  @UseGuards(PermissionsGuard)
  @ModulePermission(ChucNangHeThong.QuanLyKhaoSat)
  @ActionsPermission([QuyenHeThong.Edit])
  @Post()
  async createKhaoSat(
    @Body(ValidationPipe) createKhaoSatDto: CreateKhaoSatDTO,
    @Response() res,
  ) {
    const ans = await this.khaoSatService.createKhaoSat(createKhaoSatDto);
    return ApiResponse(
      res,
      ResponseCode.CREATED,
      'Tạo khảo sát thành công',
      ans,
    );
  }

  @UseGuards(PermissionsGuard)
  @ModulePermission(ChucNangHeThong.QuanLyKhaoSat)
  @ActionsPermission([QuyenHeThong.Edit])
  @Put(':id')
  async updateKhaoSat(
    @Param('id') id: string,
    @Body(ValidationPipe) updateKhaoSatDto: UpdateKhaoSatDTO,
    @Response() res,
  ) {
    const ans = await this.khaoSatService.updateKhaoSat(id, updateKhaoSatDto);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Cập nhật khảo sát thành công',
      ans,
    );
  }

  @UseGuards(PermissionsGuard)
  @ModulePermission(ChucNangHeThong.QuanLyKhaoSat)
  @ActionsPermission([QuyenHeThong.Edit])
  @Delete(':id')
  async deleteKhaoSat(@Param('id') id: string, @Response() res) {
    await this.khaoSatService.deleteKhaoSat(id);
    return ApiResponse(res, ResponseCode.SUCCESS, 'Xóa khảo sát thành công');
  }

  @UseGuards(JwtAuthGuard)
  @Get('chi-tiet/:id')
  async getKhaoSatChiTiet(@Param('id') id: string, @Response() res) {
    const ans = await this.khaoSatService.getKhaoSatChiTiet(id);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy khảo sát chi tiết thành công',
      ans,
    );
  }
}
