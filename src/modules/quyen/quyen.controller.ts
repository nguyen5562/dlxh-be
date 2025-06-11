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
import { UpdateQuyenDTO } from './dto/update-quyen.dto';
import { QuyenService } from './quyen.service';
import { CreateQuyenDTO } from './dto/create-quyen.dto';
import { PermissionsGuard } from '../../guards/permissions.guard';
import {
  ActionsPermission,
  ModulePermission,
} from '../../decorators/module-action.decorator';
import { QuyenHeThong } from '../../enums/quyen-he-thong.enum';
import { ChucNangHeThong } from '../../enums/chuc-nang-he-thong.enum';
import { ApiResponse } from '../../helper/response.helper';
import { ResponseCode } from '../../const/response.const';
import { Pagination } from '../../decorators/pagination.decorator';
import { PaginationType } from '../../middleware/pagination.middleware';
import { Filter } from 'src/decorators/filter.pagination';
import { FilterType } from 'src/middleware/filter.middleware';

@UseGuards(PermissionsGuard)
@Controller('quyen')
export class QuyenController {
  constructor(private readonly quyenService: QuyenService) {}

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get()
  async getAllQuyens(
    @Response() res,
    @Pagination() pagination: PaginationType,
    @Filter() filter: FilterType,
  ) {
    const { data, total } = await this.quyenService.findAllQuyens(
      filter,
      pagination,
    );

    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy danh sách quyền thành công',
      {
        danh_sach_quyen: data,
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
  async getQuyenById(@Param('id') id: string, @Response() res) {
    const ans = await this.quyenService.findQuyenById(id);
    return ApiResponse(res, ResponseCode.SUCCESS, 'Lấy quyền thành công', ans);
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.Edit])
  @Post()
  async createQuyen(
    @Body(ValidationPipe) createQuyenDto: CreateQuyenDTO,
    @Response() res,
  ) {
    const ans = await this.quyenService.createQuyen(createQuyenDto);
    return ApiResponse(res, ResponseCode.CREATED, 'Tạo quyền thành công', ans);
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.Edit])
  @Put(':id')
  async updateQuyen(
    @Param('id') id: string,
    @Body(ValidationPipe) updateQuyenDto: UpdateQuyenDTO,
    @Response() res,
  ) {
    const ans = await this.quyenService.updateQuyen(id, updateQuyenDto);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Cập nhật quyền thành công',
      ans,
    );
  }

  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.Edit])
  @Delete(':id')
  async deleteQuyen(@Param('id') id: string, @Response() res) {
    await this.quyenService.deleteQuyen(id);
    return ApiResponse(res, ResponseCode.SUCCESS, 'Xóa quyền thành công');
  }
}
