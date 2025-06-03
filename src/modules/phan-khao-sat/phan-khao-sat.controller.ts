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
import { PhanKhaoSatService } from './phan-khao-sat.service';
import { PhanKhaoSat } from './schema/phan-khao-sat.schema';
import { CreatePhanKhaoSatDto } from './dto/create-phan-khao-sat.dto';
import { UpdatePhanKhaoSatDto } from './dto/update-phan-khao-sat.dto';
import { ApiResponse } from 'src/helper/response.helper';
import { ResponseCode } from 'src/const/response.const';

@Controller('phan-khao-sat')
export class PhanKhaoSatController {
  constructor(private readonly phanKhaoSatService: PhanKhaoSatService) {}

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

  @Post()
  async createPhanKhaoSat(
    @Body(ValidationPipe) createPhanKhaoSatDto: CreatePhanKhaoSatDto,
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

  @Put(':id')
  async updatePhanKhaoSat(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePhanKhaoSatDto: UpdatePhanKhaoSatDto,
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
}
