import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Response,
  ValidationPipe,
} from '@nestjs/common';
import { PhanHoiService } from './phan-hoi.service';
import { CreatePhanHoiDTO } from './dto/create-phan-hoi.dto';
import { ApiResponse } from '../../helper/response.helper';
import { ResponseCode } from '../../const/response.const';

@Controller('phan-hoi')
export class PhanHoiController {
  constructor(private readonly phanHoiService: PhanHoiService) {}

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

  @Delete(':id')
  async deletePhanHoi(@Param('id') id: string, @Response() res) {
    await this.phanHoiService.deletePhanHoi(id);
    return ApiResponse(res, ResponseCode.SUCCESS, 'Xóa phản hồi thành công');
  }
}
