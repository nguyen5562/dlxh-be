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
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('phan-hoi')
export class PhanHoiController {
  constructor(private readonly phanHoiService: PhanHoiService) {}

  @UseGuards(PermissionsGuard)
  @ModulePermission(ChucNangHeThong.QuanLyPhanHoi)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get()
  async getAllPhanHoi(@Response() res) {
    const ans = await this.phanHoiService.getAllPhanHoi();
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy tất cả phản hồi thành công',
      ans,
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
}
