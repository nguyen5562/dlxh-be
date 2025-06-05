import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  Response,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { CreateNguoiDungDTO } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDTO } from './dto/update-nguoi-dung.dto';
import { PermissionsGuard } from '../../guards/permissions.guard';
import {
  ActionsPermission,
  ModulePermission,
} from '../../decorators/module-action.decorator';
import { ChucNangHeThong } from '../../enums/chuc-nang-he-thong.enum';
import { QuyenHeThong } from '../../enums/quyen-he-thong.enum';
import { ResponseCode } from '../../const/response.const';
import { ApiResponse } from '../../helper/response.helper';
import { Pagination } from '../../decorators/pagination.decorator';
import { PaginationType } from '../../middleware/pagination.middleware';

@UseGuards(PermissionsGuard)
@Controller('nguoi-dung')
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) {}

  @ModulePermission(ChucNangHeThong.QuanLyNguoiDung)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get()
  async getAllNguoiDungs(
    @Response() res,
    @Pagination() pagination: PaginationType,
  ) {
    const { data, total } =
      await this.nguoiDungService.getAllNguoiDungs(pagination);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy danh sách người dùng thành công',
      {
        danh_sach_nguoi_dung: data,
        pagination: {
          page: pagination.page,
          size: pagination.limit,
          total,
          offset: pagination.skip,
        },
      },
    );
  }

  // @ModulePermission(ChucNangHeThong.QuanLyNguoiDung)
  // @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  // @Get('chi-tiet')
  // async getAllNguoiDungsAndVaiTroAndQuyens(@Response() res) {
  //   const ans =
  //     await this.nguoiDungService.getAllNguoiDungsAndVaiTroAndQuyens();
  //   return ApiResponse(
  //     res,
  //     ResponseCode.SUCCESS,
  //     'Lấy danh sách chi tiết người dùng và vai trò và quyền thành công',
  //     ans,
  //   );
  // }

  @ModulePermission(ChucNangHeThong.QuanLyNguoiDung)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get(':id')
  async getNguoiDungById(@Param('id') id: string, @Response() res) {
    const ans = await this.nguoiDungService.getNguoiDungById(id);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy người dùng thành công',
      ans,
    );
  }

  @ModulePermission(ChucNangHeThong.QuanLyNguoiDung)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get('chi-tiet/:id')
  async getChiTiet(@Param('id') id: string, @Response() res) {
    const ans =
      await this.nguoiDungService.getNguoiDungAndVaiTroAndQuyensById(id);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy chi tiết người dùng thành công',
      ans,
    );
  }

  @ModulePermission(ChucNangHeThong.QuanLyNguoiDung)
  @ActionsPermission([QuyenHeThong.Edit])
  @Post()
  async createNguoiDung(
    @Body(ValidationPipe) createNguoiDungDto: CreateNguoiDungDTO,
    @Response() res,
  ) {
    const ans = await this.nguoiDungService.createNguoiDung(createNguoiDungDto);
    return ApiResponse(
      res,
      ResponseCode.CREATED,
      'Tạo người dùng thành công',
      ans,
    );
  }

  @ModulePermission(ChucNangHeThong.QuanLyNguoiDung)
  @ActionsPermission([QuyenHeThong.Edit])
  @Put(':id')
  async updateNguoiDung(
    @Param('id') id: string,
    @Body(ValidationPipe) updateNguoiDungDto: UpdateNguoiDungDTO,
    @Response() res,
  ) {
    const ans = await this.nguoiDungService.updateNguoiDung(
      id,
      updateNguoiDungDto,
    );
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Cập nhật người dùng thành công',
      ans,
    );
  }

  @ModulePermission(ChucNangHeThong.QuanLyNguoiDung)
  @ActionsPermission([QuyenHeThong.Edit])
  @Delete(':id')
  async deleteNguoiDung(@Param('id') id: string, @Response() res) {
    await this.nguoiDungService.deleteNguoiDung(id);
    return ApiResponse(res, ResponseCode.SUCCESS, 'Xóa người dùng thành công');
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get('quyens/:userId')
  async getQuyensByNguoiDungId(
    @Param('userId') userId: string,
    @Response() res,
  ) {
    const ans = await this.nguoiDungService.getQuyensByNguoiDungId(userId);

    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy quyền cho người dùng thành công',
      ans,
    );
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get('vai-tro/:userId')
  async getVaiTroByNguoiDungId(
    @Param('userId') userId: string,
    @Response() res,
  ) {
    const ans = await this.nguoiDungService.getVaiTroByNguoiDungId(userId);

    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy vai trò cho người dùng thành công',
      ans,
    );
  }
}
