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
import { UpdateQuyenDto } from './dto/update-quyen.dto';
import { QuyenService } from './quyen.service';
import { CreateQuyenDto } from './dto/create-quyen.dto';
import { PermissionsGuard } from '../../guards/permissions.guard';
import {
  ActionsPermission,
  ModulePermission,
} from '../../decorators/module-action.decorator';
import { QuyenHeThong } from '../../enums/quyen-he-thong.enum';
import { ChucNangHeThong } from '../../enums/chuc-nang-he-thong.enum';

@UseGuards(PermissionsGuard)
@Controller('quyen')
export class QuyenController {
  constructor(private readonly quyenService: QuyenService) {}

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get()
  async getAllQuyens() {
    return await this.quyenService.findAllQuyens();
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get(':id')
  async getQuyenById(@Param('id') id: string) {
    return await this.quyenService.findQuyenById(id);
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.Edit])
  @Post()
  async createQuyen(@Body(ValidationPipe) createQuyenDto: CreateQuyenDto) {
    return await this.quyenService.createQuyen(createQuyenDto);
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.Edit])
  @Put(':id')
  async updateQuyen(
    @Param('id') id: string,
    @Body(ValidationPipe) updateQuyenDto: UpdateQuyenDto,
  ) {
    return await this.quyenService.updateQuyen(id, updateQuyenDto);
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.Edit])
  @Delete(':id')
  async deleteQuyen(@Param('id') id: string) {
    return await this.quyenService.deleteQuyen(id);
  }
}
