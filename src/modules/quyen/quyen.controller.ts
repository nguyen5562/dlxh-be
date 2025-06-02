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
import { ApiResponse } from '../../helper/response.helper';
import { ResponseCode } from '../../const/response.const';

@UseGuards(PermissionsGuard)
@Controller('quyen')
export class QuyenController {
  constructor(private readonly quyenService: QuyenService) {}

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get()
  async getAllQuyens(@Response() res) {
    const ans = await this.quyenService.findAllQuyens();
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy danh sách quyền thành công',
      {
        permissions: ans,
      },
    );
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get(':id')
  async getQuyenById(@Param('id') id: string, @Response() res) {
    const ans = await this.quyenService.findQuyenById(id);
    return ApiResponse(res, ResponseCode.SUCCESS, 'Lấy quyền thành công', {
      permission: ans,
    });
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.Edit])
  @Post()
  async createQuyen(
    @Body(ValidationPipe) createQuyenDto: CreateQuyenDto,
    @Response() res,
  ) {
    const ans = await this.quyenService.createQuyen(createQuyenDto);
    return ApiResponse(res, ResponseCode.CREATED, 'Tạo quyền thành công', {
      permission: ans,
    });
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.Edit])
  @Put(':id')
  async updateQuyen(
    @Param('id') id: string,
    @Body(ValidationPipe) updateQuyenDto: UpdateQuyenDto,
    @Response() res,
  ) {
    const ans = await this.quyenService.updateQuyen(id, updateQuyenDto);
    return ApiResponse(res, ResponseCode.SUCCESS, 'Cập nhật quyền thành công', {
      permission: ans,
    });
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.Edit])
  @Delete(':id')
  async deleteQuyen(@Param('id') id: string, @Response() res) {
    await this.quyenService.deleteQuyen(id);
    return ApiResponse(res, ResponseCode.SUCCESS, 'Xóa quyền thành công');
  }
}
