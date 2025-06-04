import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KhaoSat, KhaoSatDocument } from './schema/khao-sat.schema';
import { CreateKhaoSatDto } from './dto/create-khao-sat.dto';
import { UpdateKhaoSatDto } from './dto/update-khao-sat.dto';
import { PhanKhaoSatService } from '../phan-khao-sat/phan-khao-sat.service';
import { KhaoSatDTO } from './dto/khao-sat.dto';

@Injectable()
export class KhaoSatService {
  constructor(
    @InjectModel(KhaoSat.name)
    private readonly khaoSatModel: Model<KhaoSatDocument>,

    private readonly phanKhaoSatService: PhanKhaoSatService,
  ) {}

  async createKhaoSat(createKhaoSatDto: CreateKhaoSatDto): Promise<KhaoSat> {
    const newKhaoSat = await this.khaoSatModel.create(createKhaoSatDto);
    return newKhaoSat;
  }

  async updateKhaoSat(
    id: string,
    updateKhaoSatDto: UpdateKhaoSatDto,
  ): Promise<KhaoSat> {
    const updated = await this.khaoSatModel.findByIdAndUpdate(
      id,
      updateKhaoSatDto,
      { new: true },
    );
    if (!updated) throw new NotFoundException(`Khảo sát không tồn tại`);
    return updated;
  }

  async deleteKhaoSat(id: string): Promise<void> {
    await this.phanKhaoSatService.deletePhanKhaoSatByKhaoSatId(id);
    const deleted = await this.khaoSatModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException(`Khảo sát không tồn tại`);
  }

  async getAllKhaoSat(): Promise<KhaoSat[]> {
    return await this.khaoSatModel
      .find()
      .populate('ma_nguoi_tao', '_id ten_nguoi_dung');
  }

  async getKhaoSatById(id: string): Promise<KhaoSat> {
    const khaoSat = await this.khaoSatModel
      .findById(id)
      .populate('ma_nguoi_tao', '_id ten_nguoi_dung');
    if (!khaoSat) throw new NotFoundException(`Khảo sát không tồn tại`);
    return khaoSat;
  }

  async getKhaoSatChiTiet(id: string): Promise<KhaoSatDTO> {
    const khaoSat = await this.khaoSatModel.findById(id);
    if (!khaoSat) throw new NotFoundException(`Khảo sát không tồn tại`);

    const phanKhaoSat =
      await this.phanKhaoSatService.getPhanKhaoSatByKhaoSatId(id);
    return {
      ...khaoSat.toObject(),
      cac_phan_khao_sat: phanKhaoSat,
    };
  }
}
