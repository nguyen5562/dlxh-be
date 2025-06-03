import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Response,
  ValidationPipe,
} from '@nestjs/common';
import { CauHoiService } from './cau-hoi.service';
import { ResponseCode } from 'src/const/response.const';
import { ApiResponse } from 'src/helper/response.helper';
import { CreateCauHoiDto } from './dto/create-cau-hoi.dto';
import { UpdateCauHoiDto } from './dto/update-cau-hoi.dto';

@Controller('cau-hoi')
export class CauHoiController {
  constructor(private cauHoiService: CauHoiService) {}

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

  @Post()
  async createCauHoi(
    @Body(ValidationPipe) createCauHoiDto: CreateCauHoiDto,
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

  @Put(':id')
  async updateCauHoi(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCauHoiDto: UpdateCauHoiDto,
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

  @Delete(':id')
  async deleteCauHoi(@Param('id') id: string, @Response() res) {
    await this.cauHoiService.deleteCauHoi(id);
    return ApiResponse(res, ResponseCode.SUCCESS, 'Xóa câu hỏi thành công');
  }
}
