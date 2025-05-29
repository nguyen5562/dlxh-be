import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { AssignRoleDto } from './dto/assign-role.dto';

@Controller('nguoi-dung')
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) {}

  @Get()
  async getAllNguoiDungs() {
    return await this.nguoiDungService.getAllNguoiDungs();
  }

  @Get(':id')
  async getNguoiDungById(@Param('id') id: string) {
    return await this.nguoiDungService.getNguoiDungById(id);
  }

  @Post()
  async createNguoiDung(
    @Body(ValidationPipe) createNguoiDungDto: CreateNguoiDungDto,
  ) {
    return await this.nguoiDungService.createNguoiDung(createNguoiDungDto);
  }

  @Put(':id')
  async updateNguoiDung(
    @Param('id') id: string,
    @Body(ValidationPipe) updateNguoiDungDto: UpdateNguoiDungDto,
  ) {
    return await this.nguoiDungService.updateNguoiDung(id, updateNguoiDungDto);
  }

  @Delete(':id')
  async deleteNguoiDung(@Param('id') id: string) {
    return await this.nguoiDungService.deleteNguoiDung(id);
  }

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

  @Post('remove-role/:userId')
  async xoaVaiTroChoNguoiDung(@Param('userId') userId: string) {
    return await this.nguoiDungService.xoaVaiTroChoNguoiDung(userId);
  }

  @Get('quyens/:userId')
  async getQuyensByNguoiDungId(@Param('userId') userId: string) {
    return await this.nguoiDungService.getQuyensByNguoiDungId(userId);
  }

  @Get('vai-tro/:userId')
  async getVaiTroByNguoiDungId(@Param('userId') userId: string) {
    return await this.nguoiDungService.getVaiTroByNguoiDungId(userId);
  }
}
