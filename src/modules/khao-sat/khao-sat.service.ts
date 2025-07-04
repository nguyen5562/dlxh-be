import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KhaoSat, KhaoSatDocument } from './schema/khao-sat.schema';
import { CreateKhaoSatDTO } from './dto/create-khao-sat.dto';
import { UpdateKhaoSatDTO } from './dto/update-khao-sat.dto';
import { PhanKhaoSatService } from '../phan-khao-sat/phan-khao-sat.service';
import { KhaoSatDTO } from './dto/khao-sat.dto';
import { PaginationType } from '../../middleware/pagination.middleware';
import { FilterType } from 'src/middleware/filter.middleware';

@Injectable()
export class KhaoSatService {
  constructor(
    @InjectModel(KhaoSat.name)
    private readonly khaoSatModel: Model<KhaoSatDocument>,

    private readonly phanKhaoSatService: PhanKhaoSatService,
  ) {}

  async createKhaoSat(createKhaoSatDto: CreateKhaoSatDTO): Promise<KhaoSat> {
    if (!createKhaoSatDto.cho_phep_tra_loi_nhieu_lan)
      createKhaoSatDto.gioi_han_phan_hoi_moi_nguoi = 1;

    const newKhaoSat = await this.khaoSatModel.create(createKhaoSatDto);
    return newKhaoSat;
  }

  async updateKhaoSat(
    id: string,
    updateKhaoSatDto: UpdateKhaoSatDTO,
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

  async getAllKhaoSat(
    filter: FilterType,
    pagination: PaginationType,
  ): Promise<{ data: KhaoSat[]; total: number }> {
    const search = filter.text_search
      ? {
          tieu_de: { $regex: filter.text_search, $options: 'i' },
        }
      : {};

    const [data, total] = await Promise.all([
      this.khaoSatModel
        .find(search)
        .skip(pagination.skip)
        .limit(pagination.limit)
        .populate('ma_nguoi_tao', '_id ten_nguoi_dung'),
      this.khaoSatModel.countDocuments(),
    ]);

    return { data, total };
  }

  async getKhaoSatById(id: string): Promise<KhaoSat> {
    const khaoSat = await this.khaoSatModel.findById(id);
    // .populate('ma_nguoi_tao', '_id ten_nguoi_dung');
    if (!khaoSat) throw new NotFoundException(`Khảo sát không tồn tại`);
    return khaoSat;
  }

  async getKhaoSatChiTiet(id: string): Promise<KhaoSatDTO> {
    const khaoSat = await this.khaoSatModel.findById(id);
    if (!khaoSat) throw new NotFoundException(`Khảo sát không tồn tại`);

    const phanKhaoSat =
      await this.phanKhaoSatService.getPhanKhaoSatChiTietByKhaoSatId(id);
    return {
      ...khaoSat.toObject(),
      cac_phan_khao_sat: phanKhaoSat,
    };
  }
}
