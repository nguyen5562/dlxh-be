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
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { PermissionsGuard } from '../../guards/permissions.guard';
import {
  ActionsPermission,
  ModulePermission,
} from '../../decorators/module-action.decorator';
import { ChucNangHeThong } from '../../enums/chuc-nang-he-thong.enum';
import { QuyenHeThong } from '../../enums/quyen-he-thong.enum';
import { ResponseCode } from '../../const/response.const';
import { ApiResponse } from '../../helper/response.helper';

@UseGuards(PermissionsGuard)
@Controller('nguoi-dung')
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) {}

  @ModulePermission(ChucNangHeThong.QuanLyNguoiDung)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get()
  async getAllNguoiDungs(@Response() res) {
    const ans = await this.nguoiDungService.getAllNguoiDungs();
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy danh sách người dùng thành công',
      ans,
    );
  }

  @ModulePermission(ChucNangHeThong.QuanLyNguoiDung)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get('chi-tiet')
  async getAllNguoiDungsAndVaiTroAndQuyens(@Response() res) {
    const ans =
      await this.nguoiDungService.getAllNguoiDungsAndVaiTroAndQuyens();
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy danh sách chi tiết người dùng và vai trò và quyền thành công',
      ans,
    );
  }

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
  @ActionsPermission([QuyenHeThong.Edit])
  @Post()
  async createNguoiDung(
    @Body(ValidationPipe) createNguoiDungDto: CreateNguoiDungDto,
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
    @Body(ValidationPipe) updateNguoiDungDto: UpdateNguoiDungDto,
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
  @ActionsPermission([QuyenHeThong.Edit])
  @Post('gan-vai-tro/:userId')
  async ganVaiTroChoNguoiDung(
    @Param('userId') userId: string,
    @Body(ValidationPipe) assignRoleDto: AssignRoleDto,
    @Response() res,
  ) {
    const ans = await this.nguoiDungService.ganVaiTroChoNguoiDung(
      userId,
      assignRoleDto.ma_vai_tro,
    );

    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Gán vai trò cho người dùng thành công',
      ans,
    );
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.Edit])
  @Post('xoa-vai-tro/:userId')
  async xoaVaiTroChoNguoiDung(
    @Param('userId') userId: string,
    @Response() res,
  ) {
    const ans = await this.nguoiDungService.xoaVaiTroChoNguoiDung(userId);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Xóa vai trò cho người dùng thành công',
      ans,
    );
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
