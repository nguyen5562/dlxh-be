import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CauHoi, CauHoiDocument } from './schema/cau-hoi.schema';
import { CreateCauHoiDto } from './dto/create-cau-hoi.dto';
import { UpdateCauHoiDto } from './dto/update-cau-hoi.dto';
import { DapAnService } from '../dap-an/dap-an.service';

@Injectable()
export class CauHoiService {
  constructor(
    @InjectModel(CauHoi.name) private cauHoiModel: Model<CauHoiDocument>,

    private readonly dapAnService: DapAnService,
  ) {}

  async createCauHoi(createCauHoiDto: CreateCauHoiDto): Promise<CauHoi> {
    const cauHoi = new this.cauHoiModel(createCauHoiDto);
    return cauHoi.save();
  }

  async updateCauHoi(
    id: string,
    updateCauHoiDto: UpdateCauHoiDto,
  ): Promise<CauHoi> {
    const cauHoi = await this.cauHoiModel.findByIdAndUpdate(
      id,
      updateCauHoiDto,
      {
        new: true,
      },
    );
    if (!cauHoi) {
      throw new NotFoundException('Câu hỏi không tồn tại');
    }
    return cauHoi;
  }

  async deleteCauHoi(id: string): Promise<void> {
    const cauHoi = await this.cauHoiModel.findByIdAndDelete(id);
    if (!cauHoi) {
      throw new NotFoundException('Câu hỏi không tồn tại');
    }
  }

  async getAllCauHoi(): Promise<CauHoi[]> {
    return this.cauHoiModel.find();
  }

  async getCauHoiById(id: string): Promise<CauHoi> {
    const cauHoi = await this.cauHoiModel.findById(id);
    if (!cauHoi) {
      throw new NotFoundException('Câu hỏi không tồn tại');
    }
    return cauHoi;
  }
}
