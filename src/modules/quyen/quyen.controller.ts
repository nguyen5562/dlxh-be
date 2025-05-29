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
import { UpdateQuyenDto } from './dto/update-quyen.dto';
import { QuyenService } from './quyen.service';
import { CreateQuyenDto } from './dto/create-quyen.dto';

@Controller('quyen')
export class QuyenController {
  constructor(private readonly quyenService: QuyenService) {}

  @Get()
  async getAllQuyens() {
    return await this.quyenService.findAllQuyens();
  }

  @Get(':id')
  async getQuyenById(@Param('id') id: string) {
    return await this.quyenService.findQuyenById(id);
  }

  @Post()
  async createQuyen(@Body(ValidationPipe) createQuyenDto: CreateQuyenDto) {
    return await this.quyenService.createQuyen(createQuyenDto);
  }

  @Put(':id')
  async updateQuyen(
    @Param('id') id: string,
    @Body(ValidationPipe) updateQuyenDto: UpdateQuyenDto,
  ) {
    return await this.quyenService.updateQuyen(id, updateQuyenDto);
  }

  @Delete(':id')
  async deleteQuyen(@Param('id') id: string) {
    return await this.quyenService.deleteQuyen(id);
  }
}
