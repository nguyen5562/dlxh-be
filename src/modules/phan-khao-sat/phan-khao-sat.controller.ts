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
import { PhanKhaoSatService } from './phan-khao-sat.service';
import { PhanKhaoSat } from './schema/phan-khao-sat.schema';
import { CreatePhanKhaoSatDTO } from './dto/create-phan-khao-sat.dto';
import { UpdatePhanKhaoSatDTO } from './dto/update-phan-khao-sat.dto';
import { ApiResponse } from '../../helper/response.helper';
import { ResponseCode } from '../../const/response.const';
import { PermissionsGuard } from '../../guards/permissions.guard';
import { ModulePermission } from '../../decorators/module-action.decorator';
import { ActionsPermission } from '../../decorators/module-action.decorator';
import { QuyenHeThong } from '../../enums/quyen-he-thong.enum';
import { ChucNangHeThong } from '../../enums/chuc-nang-he-thong.enum';

@UseGuards(PermissionsGuard)
@Controller('phan-khao-sat')
export class PhanKhaoSatController {
  constructor(private readonly phanKhaoSatService: PhanKhaoSatService) {}

  @ModulePermission(ChucNangHeThong.QuanLyKhaoSat)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get()
  async getAllPhanKhaoSat(@Response() res): Promise<PhanKhaoSat[]> {
    const ans = await this.phanKhaoSatService.getAllPhanKhaoSat();
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy danh sách phần khảo sát thành công',
      ans,
    );
  }

  @ModulePermission(ChucNangHeThong.QuanLyKhaoSat)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get(':id')
  async getPhanKhaoSatById(
    @Param('id') id: string,
    @Response() res,
  ): Promise<PhanKhaoSat> {
    const ans = await this.phanKhaoSatService.getPhanKhaoSatById(id);
    if (!ans) {
      return ApiResponse(
        res,
        ResponseCode.NOT_FOUND,
        'Phần khảo sát không tồn tại',
        null,
      );
    }
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy phần khảo sát thành công',
      ans,
    );
  }

  @ModulePermission(ChucNangHeThong.QuanLyKhaoSat)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get('by-khao-sat/:id')
  async getPhanKhaoSatByKhaoSatId(@Param('id') id: string, @Response() res) {
    const ans = await this.phanKhaoSatService.getPhanKhaoSatByKhaoSatId(id);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy phần khảo sát theo khảo sát thành công',
      ans,
    );
  }

  @ModulePermission(ChucNangHeThong.QuanLyKhaoSat)
  @ActionsPermission([QuyenHeThong.Edit])
  @Post()
  async createPhanKhaoSat(
    @Body(ValidationPipe) createPhanKhaoSatDto: CreatePhanKhaoSatDTO,
    @Response() res,
  ): Promise<PhanKhaoSat> {
    const ans =
      await this.phanKhaoSatService.createPhanKhaoSat(createPhanKhaoSatDto);
    return ApiResponse(
      res,
      ResponseCode.CREATED,
      'Tạo phần khảo sát thành công',
      ans,
    );
  }

  @ModulePermission(ChucNangHeThong.QuanLyKhaoSat)
  @ActionsPermission([QuyenHeThong.Edit])
  @Put(':id')
  async updatePhanKhaoSat(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePhanKhaoSatDto: UpdatePhanKhaoSatDTO,
    @Response() res,
  ): Promise<PhanKhaoSat> {
    const ans = await this.phanKhaoSatService.updatePhanKhaoSat(
      id,
      updatePhanKhaoSatDto,
    );
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Cập nhật phần khảo sát thành công',
      ans,
    );
  }

  @ModulePermission(ChucNangHeThong.QuanLyKhaoSat)
  @ActionsPermission([QuyenHeThong.Edit])
  @Delete(':id')
  async deletePhanKhaoSat(
    @Param('id') id: string,
    @Response() res,
  ): Promise<void> {
    await this.phanKhaoSatService.deletePhanKhaoSat(id);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Xóa phần khảo sát thành công',
    );
  }

  @ModulePermission(ChucNangHeThong.QuanLyKhaoSat)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get('chi-tiet/:id')
  async getPhanKhaoSatChiTiet(@Param('id') id: string, @Response() res) {
    const ans = await this.phanKhaoSatService.getPhanKhaoSatChiTiet(id);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy phần khảo sát chi tiết thành công',
      ans,
    );
  }
}
