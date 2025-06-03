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
import { DapAnService } from './dap-an.service';
import { ResponseCode } from 'src/const/response.const';
import { ApiResponse } from 'src/helper/response.helper';
import { CreateDapAnDto } from './dto/create-dap-an.dto';
import { UpdateDapAnDto } from './dto/update-dap-an.dto';

@Controller('dap-an')
export class DapAnController {
  constructor(private dapAnService: DapAnService) {}

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

  @Post()
  async createDapAn(
    @Body(ValidationPipe) createDapAnDto: CreateDapAnDto,
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

  @Put(':id')
  async updateDapAn(
    @Param('id') id: string,
    @Body(ValidationPipe) updateDapAnDto: UpdateDapAnDto,
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

  @Delete(':id')
  async deleteDapAn(@Param('id') id: string, @Response() res) {
    await this.dapAnService.deleteDapAn(id);
    return ApiResponse(res, ResponseCode.SUCCESS, 'Xóa đáp án thành công');
  }
}
