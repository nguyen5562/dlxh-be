import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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

@UseGuards(PermissionsGuard)
@Controller('nguoi-dung')
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) {}

  @ModulePermission(ChucNangHeThong.QuanLyNguoiDung)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get()
  async getAllNguoiDungs() {
    return await this.nguoiDungService.getAllNguoiDungs();
  }

  @ModulePermission(ChucNangHeThong.QuanLyNguoiDung)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get(':id')
  async getNguoiDungById(@Param('id') id: string) {
    return await this.nguoiDungService.getNguoiDungById(id);
  }

  @ModulePermission(ChucNangHeThong.QuanLyNguoiDung)
  @ActionsPermission([QuyenHeThong.Edit])
  @Post()
  async createNguoiDung(
    @Body(ValidationPipe) createNguoiDungDto: CreateNguoiDungDto,
  ) {
    return await this.nguoiDungService.createNguoiDung(createNguoiDungDto);
  }

  @ModulePermission(ChucNangHeThong.QuanLyNguoiDung)
  @ActionsPermission([QuyenHeThong.Edit])
  @Put(':id')
  async updateNguoiDung(
    @Param('id') id: string,
    @Body(ValidationPipe) updateNguoiDungDto: UpdateNguoiDungDto,
  ) {
    return await this.nguoiDungService.updateNguoiDung(id, updateNguoiDungDto);
  }

  @ModulePermission(ChucNangHeThong.QuanLyNguoiDung)
  @ActionsPermission([QuyenHeThong.Edit])
  @Delete(':id')
  async deleteNguoiDung(@Param('id') id: string) {
    return await this.nguoiDungService.deleteNguoiDung(id);
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.Edit])
  @Post('assign-role/:userId')
  async ganVaiTroChoNguoiDung(
    @Param('userId') userId: string,
    @Body(ValidationPipe) assignRoleDto: AssignRoleDto,
  ) {
    return await this.nguoiDungService.ganVaiTroChoNguoiDung(
      userId,
      assignRoleDto.ma_vai_tro,
    );
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.Edit])
  @Post('remove-role/:userId')
  async xoaVaiTroChoNguoiDung(@Param('userId') userId: string) {
    return await this.nguoiDungService.xoaVaiTroChoNguoiDung(userId);
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get('quyens/:userId')
  async getQuyensByNguoiDungId(@Param('userId') userId: string) {
    return await this.nguoiDungService.getQuyensByNguoiDungId(userId);
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get('vai-tro/:userId')
  async getVaiTroByNguoiDungId(@Param('userId') userId: string) {
    return await this.nguoiDungService.getVaiTroByNguoiDungId(userId);
  }
}
