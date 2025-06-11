import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DonVi, DonViDocument } from './schema/don-vi.schema';
import { CreateDonViDTO } from './dto/create-don-vi.dto';
import { UpdateDonViDTO } from './dto/update-don-vi.dto';
import { VungMienService } from '../vung-mien/vung-mien.service';
import { PaginationType } from '../../middleware/pagination.middleware';
import { FilterType } from 'src/middleware/filter.middleware';

@Injectable()
export class DonViService {
  constructor(
    @InjectModel(DonVi.name)
    private readonly donViModel: Model<DonViDocument>,

    private readonly vungMienService: VungMienService,
  ) {}

  async createDonVi(createDonViDto: CreateDonViDTO): Promise<DonVi> {
    if (createDonViDto.ma_don_vi_cha) {
      const donViCha = await this.donViModel.findById(
        createDonViDto.ma_don_vi_cha,
      );
      if (!donViCha) throw new NotFoundException('Đơn vị cha không tồn tại');

      createDonViDto.ma_phan_cap = `${donViCha.ma_phan_cap}.${donViCha._id.toString()}`;
    } else {
      createDonViDto.ma_phan_cap = '0';
    }

    if (createDonViDto.ma_vung_mien) {
      const vungMien = await this.vungMienService.getVungMienById(
        createDonViDto.ma_vung_mien,
      );
      if (!vungMien) throw new NotFoundException('Vùng miền không tồn tại');
    }

    const donVi = await this.donViModel.create(createDonViDto);
    return donVi;
  }

  async updateDonVi(
    id: string,
    updateDonViDto: UpdateDonViDTO,
  ): Promise<DonVi> {
    const donVi = await this.donViModel.findById(id);
    if (!donVi) throw new NotFoundException('Đơn vị không tồn tại');

    if (updateDonViDto.ma_vung_mien) {
      const vungMien = await this.vungMienService.getVungMienById(
        updateDonViDto.ma_vung_mien,
      );
      if (!vungMien) throw new NotFoundException('Vùng miền không tồn tại');
    }

    if (updateDonViDto.ma_don_vi_cha) {
      const donViCha = await this.donViModel.findById(
        updateDonViDto.ma_don_vi_cha,
      );
      if (!donViCha) throw new NotFoundException('Đơn vị cha không tồn tại');

      // Cập nhật mã phân cấp cho đơn vị hiện tại
      const newMaPhanCap = `${donViCha.ma_phan_cap}.${donViCha._id.toString()}`;

      // Cập nhật mã phân cấp cho tất cả đơn vị con
      const oldMaPhanCap = donVi.ma_phan_cap;
      const regex = new RegExp(`^${oldMaPhanCap}(\\.|$)`);
      const donViCons = await this.donViModel.find({ ma_phan_cap: regex });

      // Cập nhật từng đơn vị con
      for (const donViCon of donViCons) {
        const newMaPhanCapCon = donViCon.ma_phan_cap.replace(
          oldMaPhanCap,
          newMaPhanCap,
        );
        await this.donViModel.findByIdAndUpdate(donViCon._id, {
          ma_phan_cap: newMaPhanCapCon,
        });
      }

      updateDonViDto.ma_phan_cap = newMaPhanCap;
      updateDonViDto.ma_don_vi_cha = donViCha._id.toString();
    }

    const updatedDonVi = await this.donViModel.findByIdAndUpdate(
      id,
      updateDonViDto,
      { new: true },
    );
    if (!updatedDonVi) throw new NotFoundException('Đơn vị không tồn tại');
    return updatedDonVi;
  }

  async deleteDonVi(id: string): Promise<void> {
    const donVi = await this.donViModel.findById(id);
    if (!donVi) throw new NotFoundException('Đơn vị không tồn tại');

    // Xóa tất cả đơn vị con
    await this.donViModel.deleteMany({
      ma_phan_cap: { $regex: `^${donVi.ma_phan_cap}\\.` },
    });

    // Xóa đơn vị hiện tại
    await this.donViModel.findByIdAndDelete(id);
  }

  async getAllDonVis(
    filter: FilterType,
    pagination: PaginationType,
  ): Promise<{ data: DonVi[]; total: number }> {
    const search = filter.text_search
      ? {
          ten_don_vi: { $regex: filter.text_search, $options: 'i' },
        }
      : {};

    const [data, total] = await Promise.all([
      this.donViModel
        .find(search)
        .limit(pagination.limit)
        .skip(pagination.skip)
        .populate('ma_don_vi_cha', '_id ten_don_vi')
        .populate('ma_vung_mien', '_id ten_vung_mien'),
      this.donViModel.countDocuments(),
    ]);

    return { data, total };
  }

  async getAll(): Promise<DonVi[]> {
    return await this.donViModel.find();
  }

  async getDonViById(id: string): Promise<DonVi> {
    const donVi = await this.donViModel.findById(id);
    // .populate('ma_don_vi_cha', '_id ten_don_vi')
    // .populate('ma_vung_mien', '_id ten_vung_mien');
    if (!donVi) throw new NotFoundException('Đơn vị không tồn tại');
    return donVi;
  }

  async getDonViByMaPhanCap(ma_phan_cap: string): Promise<DonVi> {
    const donVi = await this.donViModel.findOne({ ma_phan_cap });
    if (!donVi) throw new NotFoundException('Đơn vị không tồn tại');
    return donVi;
  }

  async getDonViCon(id: string): Promise<DonVi[]> {
    const donVi = await this.donViModel.findById(id);
    if (!donVi) throw new NotFoundException('Đơn vị không tồn tại');
    const ma_phan_cap = donVi.ma_phan_cap;
    return await this.donViModel.find({
      ma_phan_cap: { $regex: `^${ma_phan_cap}\\.` },
    });
  }

  async getDonViGoc(): Promise<DonVi[]> {
    return await this.donViModel.find({ ma_phan_cap: '0' });
  }

  async getDonViTheoCap(level: number): Promise<DonVi[]> {
    const regex = new RegExp(`^[0-9]+(\\.\\w+){${level - 1}}$`);
    return await this.donViModel.find({ ma_phan_cap: regex });
  }

  async getDonViTheoVungMien(ma_vung_mien: string): Promise<DonVi[]> {
    return await this.donViModel.find({ ma_vung_mien });
  }
}
