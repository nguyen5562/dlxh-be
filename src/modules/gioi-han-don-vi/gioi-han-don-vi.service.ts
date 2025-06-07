import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  GioiHanDonVi,
  GioiHanDonViDocument,
} from './schema/gioi-han-don-vi.schema';
import { Model } from 'mongoose';
import { CreateGioiHanDonViDTO } from './dto/create-gioi-han-don-vi.dto';
import { UpdateGioiHanDonViDTO } from './dto/update-gioi-han-don-vi.dto';
import { PaginationType } from '../../middleware/pagination.middleware';

@Injectable()
export class GioiHanDonViService {
  constructor(
    @InjectModel(GioiHanDonVi.name)
    private readonly gioiHanDonViModel: Model<GioiHanDonViDocument>,
  ) {}

  async create(
    createGioiHanDonViDto: CreateGioiHanDonViDTO,
  ): Promise<GioiHanDonVi> {
    const result = await this.gioiHanDonViModel.create(createGioiHanDonViDto);
    return result;
  }

  async getAll(
    pagination: PaginationType,
  ): Promise<{ data: GioiHanDonVi[]; total: number }> {
    const [data, total] = await Promise.all([
      this.gioiHanDonViModel
        .find()
        .limit(pagination.limit)
        .skip(pagination.skip),
      this.gioiHanDonViModel.countDocuments(),
    ]);
    return { data, total };
  }

  async getById(id: string): Promise<GioiHanDonVi> {
    const gioiHanDonVi = await this.gioiHanDonViModel.findById(id);
    if (!gioiHanDonVi) {
      throw new NotFoundException('Không tìm thấy giới hạn đơn vị');
    }
    return gioiHanDonVi;
  }

  async update(
    id: string,
    updateGioiHanDonViDto: UpdateGioiHanDonViDTO,
  ): Promise<GioiHanDonVi> {
    const gioiHanDonVi = await this.gioiHanDonViModel.findByIdAndUpdate(
      id,
      updateGioiHanDonViDto,
      { new: true },
    );

    if (!gioiHanDonVi) {
      throw new NotFoundException('Không tìm thấy giới hạn đơn vị');
    }

    return gioiHanDonVi;
  }

  async delete(id: string): Promise<void> {
    const gioiHanDonVi = await this.gioiHanDonViModel.findByIdAndDelete(id);
    if (!gioiHanDonVi)
      throw new NotFoundException('Không tìm thấy giới hạn đơn vị');
  }

  async findByKhaoSat(
    maKhaoSat: string,
    pagination: PaginationType,
  ): Promise<{ data: GioiHanDonVi[]; total: number }> {
    const [data, total] = await Promise.all([
      this.gioiHanDonViModel
        .find({ maKhaoSat: maKhaoSat })
        .limit(pagination.limit)
        .skip(pagination.skip),
      this.gioiHanDonViModel.countDocuments({ maKhaoSat: maKhaoSat }),
    ]);
    return { data, total };
  }

  async getByMaKhaoSatAndMaDonVi(
    maKhaoSat: string,
    maDonVi: string,
  ): Promise<GioiHanDonVi | null> {
    const ans = await this.gioiHanDonViModel.findOne({
      ma_khao_sat: maKhaoSat,
      ma_vung_mien: maDonVi,
    });

    return ans;
  }

  async tangSoPhanHoiHienTai(
    maKhaoSat: string,
    maDonVi: string,
  ): Promise<void> {
    await this.gioiHanDonViModel.updateOne(
      {
        ma_khao_sat: maKhaoSat,
        ma_don_vi: maDonVi,
      },
      { $inc: { so_luong_phan_hoi_hien_tai: 1 } },
    );
  }
}
