import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhanHoi, PhanHoiDocument } from './schema/phan-hoi.schema';
import { CreatePhanHoiDTO } from './dto/create-phan-hoi.dto';
import { ChiTietPhanHoiService } from '../chi-tiet-phan-hoi/chi-tiet-phan-hoi.service';
import { CreatePhanHoiDetailDTO } from './dto/create-phan-hoi-detail.dto';
import { PhanHoiDTO } from './dto/phan-hoi.dto';
import { PaginationType } from '../../middleware/pagination.middleware';

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

  async getAllPhanHoi(
    pagination: PaginationType,
  ): Promise<{ data: PhanHoi[]; total: number }> {
    const [data, total] = await Promise.all([
      this.phanHoiModel.find().skip(pagination.skip).limit(pagination.limit),
      this.phanHoiModel.countDocuments(),
    ]);

    return { data, total };
  }

  async createPhanHoiDetail(
    createPhanHoiDetailDto: CreatePhanHoiDetailDTO,
  ): Promise<PhanHoi> {
    // Tách thông tin phản hồi và chi tiết phản hồi
    const { chi_tiet_phan_hoi, ...phanHoiData } = createPhanHoiDetailDto;

    // Tạo phản hồi mới
    const newPhanHoi = await this.phanHoiModel.create(phanHoiData);

    // Tạo các chi tiết phản hồi
    const chiTietPhanHoiPromises = chi_tiet_phan_hoi.map((chiTiet) => {
      return this.chiTietPhanHoiService.createChiTietPhanHoi({
        ...chiTiet,
        ma_phan_hoi: newPhanHoi._id.toString(),
      });
    });

    // Đợi tất cả chi tiết phản hồi được tạo xong
    await Promise.all(chiTietPhanHoiPromises);

    // Trả về phản hồi đã tạo
    return newPhanHoi;
  }

  async getPhanHoiDetailById(id: string): Promise<PhanHoiDTO> {
    const phanHoi = await this.phanHoiModel.findById(id);
    if (!phanHoi) throw new NotFoundException('Phản hồi không tồn tại');
    const chiTietPhanHoi =
      await this.chiTietPhanHoiService.getChiTietPhanHoiByPhanHoiId(id);
    return {
      ...phanHoi.toObject(),
      chi_tiet_phan_hoi: chiTietPhanHoi,
    };
  }
}
