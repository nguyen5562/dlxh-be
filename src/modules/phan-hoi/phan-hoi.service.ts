import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhanHoi, PhanHoiDocument } from './schema/phan-hoi.schema';
import { CreatePhanHoiDTO } from './dto/create-phan-hoi.dto';
import { ChiTietPhanHoiService } from '../chi-tiet-phan-hoi/chi-tiet-phan-hoi.service';

@Injectable()
export class PhanHoiService {
  constructor(
    @InjectModel(PhanHoi.name)
    private readonly phanHoiModel: Model<PhanHoiDocument>,

    private readonly chiTietPhanHoiService: ChiTietPhanHoiService,
  ) {}

  async createPhanHoi(createPhanHoiDto: CreatePhanHoiDTO): Promise<PhanHoi> {
    const newPhanHoi = await this.phanHoiModel.create(createPhanHoiDto);
    return newPhanHoi;
  }

  async deletePhanHoi(id: string): Promise<void> {
    const deletedPhanHoi = await this.phanHoiModel.findByIdAndDelete(id);
    if (!deletedPhanHoi) throw new NotFoundException('Phản hồi không tồn tại');
  }

  async getPhanHoiById(id: string): Promise<PhanHoi> {
    const phanHoi = await this.phanHoiModel.findById(id);
    if (!phanHoi) throw new NotFoundException('Phản hồi không tồn tại');
    return phanHoi;
  }

  async getAllPhanHoi(): Promise<PhanHoi[]> {
    return await this.phanHoiModel.find();
  }
}
