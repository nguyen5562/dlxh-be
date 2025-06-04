import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CauHoi, CauHoiDocument } from './schema/cau-hoi.schema';
import { CreateCauHoiDTO } from './dto/create-cau-hoi.dto';
import { UpdateCauHoiDTO } from './dto/update-cau-hoi.dto';
import { DapAnService } from '../dap-an/dap-an.service';
import { CauHoiDTO } from './dto/cau-hoi.dto';

@Injectable()
export class CauHoiService {
  constructor(
    @InjectModel(CauHoi.name) private cauHoiModel: Model<CauHoiDocument>,

    private readonly dapAnService: DapAnService,
  ) {}

  async createCauHoi(createCauHoiDto: CreateCauHoiDTO): Promise<CauHoi> {
    const cauHoi = new this.cauHoiModel(createCauHoiDto);
    return cauHoi.save();
  }

  async updateCauHoi(
    id: string,
    updateCauHoiDto: UpdateCauHoiDTO,
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
    await this.dapAnService.deleteDapAnByCauHoiId(id);
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

  async getCauHoiByPhanKhaoSatId(phanKhaoSatId: string): Promise<CauHoi[]> {
    return this.cauHoiModel.find({ ma_phan_khao_sat: phanKhaoSatId });
  }

  async deleteCauHoiByPhanKhaoSatId(phanKhaoSatId: string): Promise<void> {
    const cauHois = await this.cauHoiModel.find({
      ma_phan_khao_sat: phanKhaoSatId,
    });

    for (const cauHoi of cauHois) {
      await this.dapAnService.deleteDapAnByCauHoiId(cauHoi._id.toString());
    }

    await this.cauHoiModel.deleteMany({ ma_phan_khao_sat: phanKhaoSatId });
  }

  async getCauHoiChiTiet(id: string): Promise<CauHoiDTO> {
    const cauHoi = await this.cauHoiModel.findById(id);
    if (!cauHoi) {
      throw new NotFoundException('Câu hỏi không tồn tại');
    }

    const dapAns = await this.dapAnService.getDapAnByCauHoiId(id);
    return {
      ...cauHoi.toObject(),
      cac_dap_an: dapAns,
    };
  }

  async getCauHoiChiTietByPhanKhaoSatId(
    phanKhaoSatId: string,
  ): Promise<CauHoiDTO[]> {
    const cauHois = await this.cauHoiModel.find({
      ma_phan_khao_sat: phanKhaoSatId,
    });

    const cauHoiDTOs: CauHoiDTO[] = [];
    for (const cauHoi of cauHois) {
      const dapAns = await this.dapAnService.getDapAnByCauHoiId(
        cauHoi._id.toString(),
      );
      cauHoiDTOs.push({
        ...cauHoi.toObject(),
        cac_dap_an: dapAns,
      });
    }

    return cauHoiDTOs;
  }
}
