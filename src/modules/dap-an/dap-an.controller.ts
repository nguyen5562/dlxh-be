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
import { DapAnService } from './dap-an.service';
import { ResponseCode } from '../../const/response.const';
import { ApiResponse } from '../../helper/response.helper';
import { CreateDapAnDTO } from './dto/create-dap-an.dto';
import { UpdateDapAnDTO } from './dto/update-dap-an.dto';
import { PermissionsGuard } from '../../guards/permissions.guard';
import { ModulePermission } from '../../decorators/module-action.decorator';
import { ActionsPermission } from '../../decorators/module-action.decorator';
import { QuyenHeThong } from '../../enums/quyen-he-thong.enum';
import { ChucNangHeThong } from '../../enums/chuc-nang-he-thong.enum';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('dap-an')
export class DapAnController {
  constructor(private dapAnService: DapAnService) {}

  @UseGuards(PermissionsGuard)
  @ModulePermission(ChucNangHeThong.QuanLyKhaoSat)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get()
  async getAllDapAn(@Response() res) {
    const dapAn = await this.dapAnService.getAllDapAn();
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy danh sách đáp án thành công',
      dapAn,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getDapAnById(@Param('id') id: string, @Response() res) {
    const dapAn = await this.dapAnService.getDapAnById(id);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy đáp án thành công',
      dapAn,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-cau-hoi/:id')
  async getDapAnByCauHoiId(@Param('id') id: string, @Response() res) {
    const dapAn = await this.dapAnService.getDapAnByCauHoiId(id);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy đáp án theo câu hỏi thành công',
      dapAn,
    );
  }

  @UseGuards(PermissionsGuard)
  @ModulePermission(ChucNangHeThong.QuanLyKhaoSat)
  @ActionsPermission([QuyenHeThong.Edit])
  @Post()
  async createDapAn(
    @Body(ValidationPipe) createDapAnDto: CreateDapAnDTO,
    @Response() res,
  ) {
    const dapAn = await this.dapAnService.createDapAn(createDapAnDto);
    return ApiResponse(
      res,
      ResponseCode.CREATED,
      'Tạo đáp án thành công',
      dapAn,
    );
  }

  @UseGuards(PermissionsGuard)
  @ModulePermission(ChucNangHeThong.QuanLyKhaoSat)
  @ActionsPermission([QuyenHeThong.Edit])
  @Put(':id')
  async updateDapAn(
    @Param('id') id: string,
    @Body(ValidationPipe) updateDapAnDto: UpdateDapAnDTO,
    @Response() res,
  ) {
    const dapAn = await this.dapAnService.updateDapAn(id, updateDapAnDto);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Cập nhật đáp án thành công',
      dapAn,
    );
  }

  @UseGuards(PermissionsGuard)
  @ModulePermission(ChucNangHeThong.QuanLyKhaoSat)
  @ActionsPermission([QuyenHeThong.Edit])
  @Delete(':id')
  async deleteDapAn(@Param('id') id: string, @Response() res) {
    await this.dapAnService.deleteDapAn(id);
    return ApiResponse(res, ResponseCode.SUCCESS, 'Xóa đáp án thành công');
  }
}
