import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PhanKhaoSat,
  PhanKhaoSatDocument,
} from './schema/phan-khao-sat.schema';
import { CreatePhanKhaoSatDTO } from './dto/create-phan-khao-sat.dto';
import { UpdatePhanKhaoSatDTO } from './dto/update-phan-khao-sat.dto';
import { CauHoiService } from '../cau-hoi/cau-hoi.service';
import { PhanKhaoSatDTO } from './dto/phan-khao-sat.dto';

@Injectable()
export class PhanKhaoSatService {
  constructor(
    @InjectModel(PhanKhaoSat.name)
    private phanKhaoSatModel: Model<PhanKhaoSatDocument>,

    private readonly cauHoiService: CauHoiService,
  ) {}

  async createPhanKhaoSat(
    createPhanKhaoSatDto: CreatePhanKhaoSatDTO,
  ): Promise<PhanKhaoSat> {
    const createdPhanKhaoSat = new this.phanKhaoSatModel(createPhanKhaoSatDto);
    return createdPhanKhaoSat.save();
  }

  async updatePhanKhaoSat(
    id: string,
    updatePhanKhaoSatDto: UpdatePhanKhaoSatDTO,
  ): Promise<PhanKhaoSat> {
    const updatedPhanKhaoSat = await this.phanKhaoSatModel.findByIdAndUpdate(
      id,
      updatePhanKhaoSatDto,
      {
        new: true,
      },
    );

    if (!updatedPhanKhaoSat)
      throw new NotFoundException('Phần khảo sát không tồn tại');
    return updatedPhanKhaoSat;
  }

  async deletePhanKhaoSat(id: string): Promise<void> {
    await this.cauHoiService.deleteCauHoiByPhanKhaoSatId(id);
    const deletedPhanKhaoSat =
      await this.phanKhaoSatModel.findByIdAndDelete(id);
    if (!deletedPhanKhaoSat)
      throw new NotFoundException('Phần khảo sát không tồn tại');
  }

  async getAllPhanKhaoSat(): Promise<PhanKhaoSat[]> {
    const phanKhaoSat = await this.phanKhaoSatModel.find();
    return phanKhaoSat;
  }

  async getPhanKhaoSatById(id: string): Promise<PhanKhaoSat> {
    const phanKhaoSat = await this.phanKhaoSatModel.findById(id);
    if (!phanKhaoSat)
      throw new NotFoundException('Phần khảo sát không tồn tại');
    return phanKhaoSat;
  }

  async getPhanKhaoSatByKhaoSatId(khaoSatId: string): Promise<PhanKhaoSat[]> {
    const phanKhaoSats = await this.phanKhaoSatModel.find({
      ma_khao_sat: khaoSatId,
    });
    return phanKhaoSats;
  }

  async deletePhanKhaoSatByKhaoSatId(khaoSatId: string): Promise<void> {
    const phanKhaoSats = await this.phanKhaoSatModel.find({
      ma_khao_sat: khaoSatId,
    });

    for (const phanKhaoSat of phanKhaoSats) {
      await this.cauHoiService.deleteCauHoiByPhanKhaoSatId(
        phanKhaoSat._id.toString(),
      );
    }
    await this.phanKhaoSatModel.deleteMany({ ma_khao_sat: khaoSatId });
  }

  async getPhanKhaoSatChiTiet(id: string): Promise<PhanKhaoSatDTO> {
    const phanKhaoSat = await this.phanKhaoSatModel.findById(id);
    if (!phanKhaoSat)
      throw new NotFoundException(`Phần khảo sát không tồn tại`);

    const cauHois =
      await this.cauHoiService.getCauHoiChiTietByPhanKhaoSatId(id);
    return {
      ...phanKhaoSat.toObject(),
      cac_cau_hoi: cauHois,
    };
  }

  async getPhanKhaoSatChiTietByKhaoSatId(
    khaoSatId: string,
  ): Promise<PhanKhaoSatDTO[]> {
    const phanKhaoSats = await this.phanKhaoSatModel.find({
      ma_khao_sat: khaoSatId,
    });

    const phanKhaoSatDTOs: PhanKhaoSatDTO[] = [];
    for (const phanKhaoSat of phanKhaoSats) {
      const cauHois = await this.cauHoiService.getCauHoiChiTietByPhanKhaoSatId(
        phanKhaoSat._id.toString(),
      );
      phanKhaoSatDTOs.push({
        ...phanKhaoSat.toObject(),
        cac_cau_hoi: cauHois,
      });
    }

    return phanKhaoSatDTOs;
  }
}
