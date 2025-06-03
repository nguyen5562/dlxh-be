import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DapAn, DapAnDocument } from './schema/dap-an.schema';
import { CreateDapAnDto } from './dto/create-dap-an.dto';
import { UpdateDapAnDto } from './dto/update-dap-an.dto';

@Injectable()
export class DapAnService {
  constructor(
    @InjectModel(DapAn.name) private dapAnModel: Model<DapAnDocument>,
  ) {}

  async createDapAn(createDapAnDto: CreateDapAnDto): Promise<DapAn> {
    const dapAn = new this.dapAnModel(createDapAnDto);
    return dapAn.save();
  }

  async updateDapAn(
    id: string,
    updateDapAnDto: UpdateDapAnDto,
  ): Promise<DapAn> {
    const dapAn = await this.dapAnModel.findByIdAndUpdate(id, updateDapAnDto, {
      new: true,
    });
    if (!dapAn) {
      throw new NotFoundException('Đáp án không tồn tại');
    }
    return dapAn;
  }

  async deleteDapAn(id: string): Promise<void> {
    const dapAn = await this.dapAnModel.findByIdAndDelete(id);
    if (!dapAn) {
      throw new NotFoundException('Đáp án không tồn tại');
    }
  }

  async getAllDapAn(): Promise<DapAn[]> {
    return this.dapAnModel.find();
  }

  async getDapAnById(id: string): Promise<DapAn> {
    const dapAn = await this.dapAnModel.findById(id);
    if (!dapAn) {
      throw new NotFoundException('Đáp án không tồn tại');
    }
    return dapAn;
  }

  async deleteDapAnByCauHoiId(cauHoiId: string): Promise<void> {
    await this.dapAnModel.deleteMany({ ma_cau_hoi: cauHoiId });
  }
}
