import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  GioiHanVungMien,
  GioiHanVungMienDocument,
} from './schema/gioi-han-vung-mien.schema';
import {
  PhanHoiVungMien,
  PhanHoiVungMienDocument,
} from './schema/phan-hoi-vung-mien.schema';
import { CreateGioiHanVungMienDTO } from './dto/create-gioi-han-vung-mien.dto';
import { UpdateGioiHanVungMienDTO } from './dto/update-gioi-han-vung-mien.dto';
import { PaginationType } from '../../middleware/pagination.middleware';

@Injectable()
export class GioiHanVungMienService {
  constructor(
    @InjectModel(GioiHanVungMien.name)
    private readonly gioiHanVungMienModel: Model<GioiHanVungMienDocument>,

    @InjectModel(PhanHoiVungMien.name)
    private readonly phanHoiVungMienModel: Model<PhanHoiVungMienDocument>,
  ) {}

  async create(
    createGioiHanVungMienDto: CreateGioiHanVungMienDTO,
  ): Promise<GioiHanVungMien> {
    const result = await this.gioiHanVungMienModel.create(
      createGioiHanVungMienDto,
    );
    return result;
  }

  async getAll(
    pagination: PaginationType,
  ): Promise<{ data: GioiHanVungMien[]; total: number }> {
    const [data, total] = await Promise.all([
      this.gioiHanVungMienModel
        .find()
        .limit(pagination.limit)
        .skip(pagination.skip),
      this.gioiHanVungMienModel.countDocuments(),
    ]);
    return { data, total };
  }

  async getById(id: string): Promise<GioiHanVungMien> {
    const gioiHanVungMien = await this.gioiHanVungMienModel.findById(id);
    if (!gioiHanVungMien) {
      throw new NotFoundException('Không tìm thấy giới hạn vùng miền');
    }
    return gioiHanVungMien;
  }

  async update(
    id: string,
    updateGioiHanVungMienDto: UpdateGioiHanVungMienDTO,
  ): Promise<GioiHanVungMien> {
    const gioiHanVungMien = await this.gioiHanVungMienModel.findByIdAndUpdate(
      id,
      updateGioiHanVungMienDto,
      { new: true },
    );

    if (!gioiHanVungMien) {
      throw new NotFoundException('Không tìm thấy giới hạn vùng miền');
    }

    return gioiHanVungMien;
  }

  async delete(id: string): Promise<void> {
    const gioiHanVungMien =
      await this.gioiHanVungMienModel.findByIdAndDelete(id);
    if (!gioiHanVungMien)
      throw new NotFoundException('Không tìm thấy giới hạn vùng miền');
  }

  async findByKhaoSat(
    maKhaoSat: string,
    pagination: PaginationType,
  ): Promise<{ data: GioiHanVungMien[]; total: number }> {
    const [data, total] = await Promise.all([
      this.gioiHanVungMienModel
        .find({ ma_khao_sat: maKhaoSat })
        .limit(pagination.limit)
        .skip(pagination.skip),
      this.gioiHanVungMienModel.countDocuments({ ma_khao_sat: maKhaoSat }),
    ]);
    return { data, total };
  }

  async getGioiHanByMaKhaoSatAndMaVungMien(
    maKhaoSat: string,
    maVungMien: string,
  ): Promise<GioiHanVungMien | null> {
    const ans = await this.gioiHanVungMienModel.findOne({
      ma_khao_sat: maKhaoSat,
      ma_vung_mien: maVungMien,
    });

    return ans;
  }

  async getSoPhanHoiByMaKhaoSatAndMaVungMien(
    maKhaoSat: string,
    maVungMien: string,
  ): Promise<PhanHoiVungMien | null> {
    const ans = await this.phanHoiVungMienModel.findOne({
      ma_khao_sat: maKhaoSat,
      ma_vung_mien: maVungMien,
    });

    return ans;
  }

  async getSoPhanHoiByMaKhaoSat(maKhaoSat: string): Promise<PhanHoiVungMien[]> {
    const ans = await this.phanHoiVungMienModel.find({
      ma_khao_sat: maKhaoSat,
    });

    return ans;
  }

  async tangSoPhanHoiHienTai(
    maKhaoSat: string,
    maVungMien: string,
  ): Promise<void> {
    await this.phanHoiVungMienModel.updateOne(
      { ma_khao_sat: maKhaoSat, ma_vung_mien: maVungMien },
      {
        $inc: { so_luong_phan_hoi_hien_tai: 1 },
        $setOnInsert: { ma_khao_sat: maKhaoSat, ma_vung_mien: maVungMien },
      },
      { upsert: true },
    );
  }
}
