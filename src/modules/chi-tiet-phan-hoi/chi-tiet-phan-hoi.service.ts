import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ChiTietPhanHoi,
  ChiTietPhanHoiDocument,
} from './schema/chi-tiet-phan-hoi.schema';
import { CreateChiTietPhanHoiDTO } from './dto/create-chi-tiet-phan-hoi.dto';

@Injectable()
export class ChiTietPhanHoiService {
  constructor(
    @InjectModel(ChiTietPhanHoi.name)
    private readonly chiTietPhanHoiModel: Model<ChiTietPhanHoiDocument>,
  ) {}

  async createChiTietPhanHoi(
    createChiTietPhanHoiDto: CreateChiTietPhanHoiDTO,
  ): Promise<ChiTietPhanHoi> {
    const newChiTietPhanHoi = await this.chiTietPhanHoiModel.create(
      createChiTietPhanHoiDto,
    );
    return newChiTietPhanHoi;
  }

  async deleteChiTietPhanHoi(id: string): Promise<void> {
    const deletedChiTietPhanHoi =
      await this.chiTietPhanHoiModel.findByIdAndDelete(id);
    if (!deletedChiTietPhanHoi)
      throw new NotFoundException('Chi tiết phản hồi không tồn tại');
  }

  async getChiTietPhanHoiById(id: string): Promise<ChiTietPhanHoi> {
    const chiTietPhanHoi = await this.chiTietPhanHoiModel.findById(id);
    if (!chiTietPhanHoi)
      throw new NotFoundException('Chi tiết phản hồi không tồn tại');
    return chiTietPhanHoi;
  }

  async getAllChiTietPhanHoi(): Promise<ChiTietPhanHoi[]> {
    return await this.chiTietPhanHoiModel.find();
  }
}
