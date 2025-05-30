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
import { UpdateVaiTroDto } from './dto/update-vai-tro.dto';
import { VaiTroService } from './vai-tro.service';
import { CreateVaiTroDto } from './dto/create-vai-tro.dto';
import { AddQuyenToVaiTroDto } from './dto/add-quyen-to-vai-tro.dto';
import { RemoveQuyenFromVaiTroDto } from './dto/remove-quyen-from-vai-tro.dto';
import { PermissionsGuard } from '../../guards/permissions.guard';
import {
  ActionsPermission,
  ModulePermission,
} from '../../decorators/module-action.decorator';
import { QuyenHeThong } from '../../enums/quyen-he-thong.enum';
import { ChucNangHeThong } from '../../enums/chuc-nang-he-thong.enum';

@UseGuards(PermissionsGuard)
@Controller('vai-tro')
export class VaiTroController {
  constructor(private readonly vaiTroService: VaiTroService) {}

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get()
  async getAllVaiTros() {
    return await this.vaiTroService.getAllVaiTros();
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get(':id')
  async getVaiTroById(@Param('id') id: string) {
    return await this.vaiTroService.getVaiTroById(id);
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.Edit])
  @Post()
  async createVaiTro(@Body(ValidationPipe) createVaiTroDto: CreateVaiTroDto) {
    return await this.vaiTroService.createVaiTro(createVaiTroDto);
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.Edit])
  @Put(':id')
  async updateVaiTro(
    @Param('id') id: string,
    @Body(ValidationPipe) updateVaiTroDto: UpdateVaiTroDto,
  ) {
    return await this.vaiTroService.updateVaiTro(id, updateVaiTroDto);
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.Edit])
  @Delete(':id')
  async deleteVaiTro(@Param('id') id: string) {
    return await this.vaiTroService.deleteVaiTro(id);
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.Edit])
  @Post('add-quyens/:id')
  async addQuyensToVaiTro(
    @Param('id') id: string,
    @Body(ValidationPipe) addQuyensToVaiTroDto: AddQuyenToVaiTroDto,
  ) {
    return await this.vaiTroService.addQuyensToVaiTro(id, addQuyensToVaiTroDto);
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.Edit])
  @Post('remove-quyens/:id')
  async removeQuyensFromVaiTro(
    @Param('id') id: string,
    @Body(ValidationPipe) removeQuyensFromVaiTroDto: RemoveQuyenFromVaiTroDto,
  ) {
    return await this.vaiTroService.removeQuyensFromVaiTro(
      id,
      removeQuyensFromVaiTroDto,
    );
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get('quyens/:id')
  async getQuyensByVaiTroId(@Param('id') id: string) {
    return await this.vaiTroService.getQuyensByVaiTroId(id);
  }
}
