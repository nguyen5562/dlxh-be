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
import { CauHoiService } from './cau-hoi.service';
import { ResponseCode } from '../../const/response.const';
import { ApiResponse } from '../../helper/response.helper';
import { CreateCauHoiDTO } from './dto/create-cau-hoi.dto';
import { UpdateCauHoiDTO } from './dto/update-cau-hoi.dto';
import { PermissionsGuard } from '../../guards/permissions.guard';
import { ModulePermission } from '../../decorators/module-action.decorator';
import { ActionsPermission } from '../../decorators/module-action.decorator';
import { QuyenHeThong } from '../../enums/quyen-he-thong.enum';
import { ChucNangHeThong } from '../../enums/chuc-nang-he-thong.enum';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('cau-hoi')
export class CauHoiController {
  constructor(private cauHoiService: CauHoiService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCauHoi(@Response() res) {
    const cauHoi = await this.cauHoiService.getAllCauHoi();
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy danh sách câu hỏi thành công',
      cauHoi,
    );
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCauHoiById(@Param('id') id: string, @Response() res) {
    const cauHoi = await this.cauHoiService.getCauHoiById(id);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy câu hỏi thành công',
      cauHoi,
    );
  }

  // @UseGuards(PermissionsGuard)
  @ModulePermission(ChucNangHeThong.QuanLyKhaoSat)
  @ActionsPermission([QuyenHeThong.Edit])
  @Post()
  async createCauHoi(
    @Body(ValidationPipe) createCauHoiDto: CreateCauHoiDTO,
    @Response() res,
  ) {
    const cauHoi = await this.cauHoiService.createCauHoi(createCauHoiDto);
    return ApiResponse(
      res,
      ResponseCode.CREATED,
      'Tạo câu hỏi thành công',
      cauHoi,
    );
  }

  // @UseGuards(PermissionsGuard)
  @ModulePermission(ChucNangHeThong.QuanLyKhaoSat)
  @ActionsPermission([QuyenHeThong.Edit])
  @Put(':id')
  async updateCauHoi(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCauHoiDto: UpdateCauHoiDTO,
    @Response() res,
  ) {
    const cauHoi = await this.cauHoiService.updateCauHoi(id, updateCauHoiDto);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Cập nhật câu hỏi thành công',
      cauHoi,
    );
  }

  // @UseGuards(PermissionsGuard)
  @ModulePermission(ChucNangHeThong.QuanLyKhaoSat)
  @ActionsPermission([QuyenHeThong.Edit])
  @Delete(':id')
  async deleteCauHoi(@Param('id') id: string, @Response() res) {
    await this.cauHoiService.deleteCauHoi(id);
    return ApiResponse(res, ResponseCode.SUCCESS, 'Xóa câu hỏi thành công');
  }

  // @UseGuards(JwtAuthGuard)
  @Get('chi-tiet/:id')
  async getCauHoiChiTiet(@Param('id') id: string, @Response() res) {
    const ans = await this.cauHoiService.getCauHoiChiTiet(id);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy câu hỏi chi tiết thành công',
      ans,
    );
  }

  // @UseGuards(JwtAuthGuard)
  @Get('by-phan-khao-sat/:id')
  async getCauHoiByPhanKhaoSatId(@Param('id') id: string, @Response() res) {
    const ans = await this.cauHoiService.getCauHoiByPhanKhaoSatId(id);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy câu hỏi theo phần khảo sát thành công',
      ans,
    );
  }
}
