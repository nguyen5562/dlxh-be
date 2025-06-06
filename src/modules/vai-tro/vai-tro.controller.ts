import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Response,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateVaiTroDTO } from './dto/update-vai-tro.dto';
import { VaiTroService } from './vai-tro.service';
import { CreateVaiTroDTO } from './dto/create-vai-tro.dto';
import { AddQuyenToVaiTroDTO } from './dto/add-quyen-to-vai-tro.dto';
import { RemoveQuyenFromVaiTroDTO } from './dto/remove-quyen-from-vai-tro.dto';
import { PermissionsGuard } from '../../guards/permissions.guard';
import {
  ActionsPermission,
  ModulePermission,
} from '../../decorators/module-action.decorator';
import { QuyenHeThong } from '../../enums/quyen-he-thong.enum';
import { ChucNangHeThong } from '../../enums/chuc-nang-he-thong.enum';
import { ResponseCode } from '../../const/response.const';
import { ApiResponse } from '../../helper/response.helper';
import { Pagination } from '../../decorators/pagination.decorator';
import { PaginationType } from '../../middleware/pagination.middleware';

// @UseGuards(PermissionsGuard)
@Controller('vai-tro')
export class VaiTroController {
  constructor(private readonly vaiTroService: VaiTroService) {}

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get()
  async getAllVaiTros(
    @Response() res,
    @Pagination() pagination: PaginationType,
  ) {
    const { data, total } = await this.vaiTroService.getAllVaiTros(pagination);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy danh sách vai trò thành công',
      {
        danh_sach_vai_tro: data,
        pagination: {
          page: pagination.page,
          size: pagination.limit,
          total,
          offset: pagination.skip,
        },
      },
    );
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get(':id')
  async getVaiTroById(@Param('id') id: string, @Response() res) {
    const ans = await this.vaiTroService.getVaiTroById(id);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy vai trò thành công',
      ans,
    );
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.Edit])
  @Post()
  async createVaiTro(
    @Body(ValidationPipe) createVaiTroDto: CreateVaiTroDTO,
    @Response() res,
  ) {
    const ans = await this.vaiTroService.createVaiTro(createVaiTroDto);
    return ApiResponse(
      res,
      ResponseCode.CREATED,
      'Tạo vai trò thành công',
      ans,
    );
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.Edit])
  @Put(':id')
  async updateVaiTro(
    @Param('id') id: string,
    @Body(ValidationPipe) updateVaiTroDto: UpdateVaiTroDTO,
    @Response() res,
  ) {
    const ans = await this.vaiTroService.updateVaiTro(id, updateVaiTroDto);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Cập nhật vai trò thành công',
      ans,
    );
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.Edit])
  @Delete(':id')
  async deleteVaiTro(@Param('id') id: string, @Response() res) {
    await this.vaiTroService.deleteVaiTro(id);
    return ApiResponse(res, ResponseCode.SUCCESS, 'Xóa vai trò thành công');
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.Edit])
  @Post('add-quyens/:id')
  async addQuyensToVaiTro(
    @Param('id') id: string,
    @Body(ValidationPipe) addQuyensToVaiTroDto: AddQuyenToVaiTroDTO,
    @Response() res,
  ) {
    await this.vaiTroService.addQuyensToVaiTro(id, addQuyensToVaiTroDto);

    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Thêm quyền vào vai trò thành công',
    );
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.Edit])
  @Post('remove-quyens/:id')
  async removeQuyensFromVaiTro(
    @Param('id') id: string,
    @Body(ValidationPipe) removeQuyensFromVaiTroDto: RemoveQuyenFromVaiTroDTO,
    @Response() res,
  ) {
    await this.vaiTroService.removeQuyensFromVaiTro(
      id,
      removeQuyensFromVaiTroDto,
    );

    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Xóa quyền khỏi vai trò thành công',
    );
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get('quyens/:id')
  async getQuyensByVaiTroId(@Param('id') id: string, @Response() res) {
    const ans = await this.vaiTroService.getQuyensByVaiTroId(id);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy quyền của vai trò thành công',
      ans,
    );
  }
}
