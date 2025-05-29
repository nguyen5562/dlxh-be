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
import { UpdateVaiTroDto } from './dto/update-vai-tro.dto';
import { VaiTroService } from './vai-tro.service';
import { CreateVaiTroDto } from './dto/create-vai-tro.dto';
import { AddQuyenToVaiTroDto } from './dto/add-quyen-to-vai-tro.dto';

@Controller('vai-tro')
export class VaiTroController {
  constructor(private readonly vaiTroService: VaiTroService) {}

  @Get()
  async getAllVaiTros() {
    return await this.vaiTroService.getAllVaiTros();
  }

  @Get(':id')
  async getVaiTroById(@Param('id') id: string) {
    return await this.vaiTroService.getVaiTroById(id);
  }

  @Post()
  async createVaiTro(@Body(ValidationPipe) createVaiTroDto: CreateVaiTroDto) {
    return await this.vaiTroService.createVaiTro(createVaiTroDto);
  }

  @Put(':id')
  async updateVaiTro(
    @Param('id') id: string,
    @Body(ValidationPipe) updateVaiTroDto: UpdateVaiTroDto,
  ) {
    return await this.vaiTroService.updateVaiTro(id, updateVaiTroDto);
  }

  @Delete(':id')
  async deleteVaiTro(@Param('id') id: string) {
    return await this.vaiTroService.deleteVaiTro(id);
  }

  @Post('add-quyens/:id')
  async addQuyensToVaiTro(
    @Param('id') id: string,
    @Body(ValidationPipe) addQuyensToVaiTroDto: AddQuyenToVaiTroDto,
  ) {
    return await this.vaiTroService.addQuyensToVaiTro(id, addQuyensToVaiTroDto);
  }

  @Get('quyens/:id')
  async getQuyensByVaiTroId(@Param('id') id: string) {
    return await this.vaiTroService.getQuyensByVaiTroId(id);
  }

  @Get('quyens-nguoi-dung/:id')
  async getQuyensByNguoiDungId(@Param('id') id: string) {
    return await this.vaiTroService.getQuyensByNguoiDungId(id);
  }
}
