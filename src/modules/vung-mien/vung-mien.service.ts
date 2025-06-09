import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VungMien, VungMienDocument } from './schema/vung-mien.schema';
import { CreateVungMienDTO } from './dto/create-vung-mien.dto';
import { UpdateVungMienDTO } from './dto/update-vung-mien.dto';
import { PaginationType } from '../../middleware/pagination.middleware';

@Injectable()
export class VungMienService {
  constructor(
    @InjectModel(VungMien.name)
    private readonly vungMienModel: Model<VungMienDocument>,
  ) {}

  async createVungMien(
    createVungMienDto: CreateVungMienDTO,
  ): Promise<VungMien> {
    if (createVungMienDto.ma_vung_mien_cha) {
      const vungMienCha = await this.vungMienModel.findById(
        createVungMienDto.ma_vung_mien_cha,
      );
      if (!vungMienCha)
        throw new NotFoundException('Vùng miền cha không tồn tại');

      createVungMienDto.ma_phan_cap = `${vungMienCha.ma_phan_cap}.${vungMienCha._id.toString()}`;
    } else {
      createVungMienDto.ma_phan_cap = '0';
    }

    const vungMien = await this.vungMienModel.create(createVungMienDto);
    return vungMien;
  }

  async updateVungMien(
    id: string,
    updateVungMienDto: UpdateVungMienDTO,
  ): Promise<VungMien> {
    const vungMien = await this.vungMienModel.findById(id);
    if (!vungMien) throw new NotFoundException('Vùng miền không tồn tại');

    if (updateVungMienDto.ma_vung_mien_cha) {
      const vungMienCha = await this.vungMienModel.findById(
        updateVungMienDto.ma_vung_mien_cha,
      );
      if (!vungMienCha)
        throw new NotFoundException('Vùng miền cha không tồn tại');

      // Cập nhật mã phân cấp cho vùng miền hiện tại
      const newMaPhanCap = `${vungMienCha.ma_phan_cap}.${vungMienCha._id.toString()}`;

      // Cập nhật mã phân cấp cho tất cả vùng miền con
      const oldMaPhanCap = vungMien.ma_phan_cap;
      const regex = new RegExp(`^${oldMaPhanCap}(\\.|$)`);
      const vungMienCons = await this.vungMienModel.find({
        ma_phan_cap: regex,
      });

      // Cập nhật từng vùng miền con
      for (const vungMienCon of vungMienCons) {
        const newMaPhanCapCon = vungMienCon.ma_phan_cap.replace(
          oldMaPhanCap,
          newMaPhanCap,
        );
        await this.vungMienModel.findByIdAndUpdate(vungMienCon._id, {
          ma_phan_cap: newMaPhanCapCon,
        });
      }

      updateVungMienDto.ma_phan_cap = newMaPhanCap;
      updateVungMienDto.ma_vung_mien_cha = vungMienCha._id.toString();
    }

    const updatedVungMien = await this.vungMienModel.findByIdAndUpdate(
      id,
      updateVungMienDto,
      { new: true },
    );

    if (!updatedVungMien)
      throw new NotFoundException('Vùng miền không tồn tại');
    return updatedVungMien;
  }

  async deleteVungMien(id: string): Promise<void> {
    const vungMien = await this.vungMienModel.findById(id);
    if (!vungMien) throw new NotFoundException('Vùng miền không tồn tại');

    // Xóa tất cả vùng miền con
    await this.vungMienModel.deleteMany({
      ma_phan_cap: { $regex: `^${vungMien.ma_phan_cap}\\.` },
    });

    // Xóa vùng miền hiện tại
    await this.vungMienModel.findByIdAndDelete(id);
  }

  async getAllVungMiens(
    pagination: PaginationType,
  ): Promise<{ data: VungMien[]; total: number }> {
    const [data, total] = await Promise.all([
      this.vungMienModel
        .find()
        .skip(pagination.skip)
        .limit(pagination.limit)
        .populate('ma_vung_mien_cha', '_id ten_vung_mien'),
      this.vungMienModel.countDocuments(),
    ]);

    return { data, total };
  }

  async getAll(): Promise<VungMien[]> {
    return await this.vungMienModel.find();
  }

  async getVungMienById(id: string): Promise<VungMien> {
    const vungMien = await this.vungMienModel.findById(id);
    // .populate('ma_vung_mien_cha', '_id ten_vung_mien');
    if (!vungMien) throw new NotFoundException('Vùng miền không tồn tại');
    return vungMien;
  }

  async getVungMienByMaPhanCap(ma_phan_cap: string): Promise<VungMien> {
    const vungMien = await this.vungMienModel.findOne({ ma_phan_cap });
    if (!vungMien) throw new NotFoundException('Vùng miền không tồn tại');
    return vungMien;
  }

  async getVungMienCon(id: string): Promise<VungMien[]> {
    const vungMien = await this.vungMienModel.findById(id);
    if (!vungMien) throw new NotFoundException('Vùng miền không tồn tại');
    const ma_phan_cap = vungMien.ma_phan_cap;
    return await this.vungMienModel.find({
      ma_phan_cap: { $regex: `^${ma_phan_cap}\\.` },
    });
  }

  async getVungMienGoc(): Promise<VungMien[]> {
    return await this.vungMienModel.find({ ma_phan_cap: '0' });
  }

  async getVungMienTheoCap(level: number): Promise<VungMien[]> {
    const regex = new RegExp(`^[0-9]+(\\.\\w+){${level - 1}}$`);
    return await this.vungMienModel.find({ ma_phan_cap: regex });
  }
}
