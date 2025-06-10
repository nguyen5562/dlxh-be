import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhanHoi, PhanHoiDocument } from './schema/phan-hoi.schema';
import { CreatePhanHoiDTO } from './dto/create-phan-hoi.dto';
import { ChiTietPhanHoiService } from '../chi-tiet-phan-hoi/chi-tiet-phan-hoi.service';
import { CreatePhanHoiDetailDTO } from './dto/create-phan-hoi-detail.dto';
import { PhanHoiDTO } from './dto/phan-hoi.dto';
import { PaginationType } from '../../middleware/pagination.middleware';
import { NguoiDungPhanHoiDTO } from './dto/nguoi-dung-phan-hoi.dto';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { NguoiDungDocument } from '../nguoi-dung/schema/nguoi-dung.schema';
import { GioiHanDonViService } from '../gioi-han-don-vi/gioi-han-don-vi.service';
import { GioiHanVungMienService } from '../gioi-han-vung-mien/gioi-han-vung-mien.service';

@Injectable()
export class PhanHoiService {
  constructor(
    @InjectModel(PhanHoi.name)
    private readonly phanHoiModel: Model<PhanHoiDocument>,

    private readonly chiTietPhanHoiService: ChiTietPhanHoiService,

    @Inject(forwardRef(() => NguoiDungService))
    private readonly nguoiDungService: NguoiDungService,

    private readonly gioiHanDonViService: GioiHanDonViService,

    private readonly gioiHanVungMienService: GioiHanVungMienService,
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

    // Tăng số phản hồi trong 2 bảng giới hạn
    await this.tangBoDemSauKhiTaoPhanHoi(
      phanHoiData.ma_khao_sat,
      phanHoiData.ma_nguoi_dung,
    );

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

  async getDanhSachNguoiDungDaPhanHoi(
    khaoSatId: string,
    pagination: PaginationType,
  ): Promise<{ data: NguoiDungPhanHoiDTO[]; total: number }> {
    // Find all feedbacks for the given survey
    const [phanHois, total] = await Promise.all([
      this.phanHoiModel
        .find({ ma_khao_sat: khaoSatId })
        .skip(pagination.skip)
        .limit(pagination.limit),
      this.phanHoiModel.countDocuments({ ma_khao_sat: khaoSatId }),
    ]);

    // Get user information for each feedback
    const data = await Promise.all(
      phanHois.map(async (phanHoi) => {
        if (phanHoi.ma_nguoi_dung) {
          const user = (await this.nguoiDungService.getNguoiDungAndDonViById(
            phanHoi.ma_nguoi_dung.toString(),
          )) as NguoiDungDocument;
          return {
            ...user.toObject(),
            ma_phan_hoi: phanHoi._id.toString(),
            thoi_gian_phan_hoi: phanHoi.thoi_gian_phan_hoi.toString(),
          };
        }
        return {
          _id: null,
          ma_vai_tro: null,
          ten_dang_nhap: null,
          mat_khau: null,
          ten_nguoi_dung: null,
          email: null,
          sdt: null,
          ma_don_vi: null,
          ma_phan_hoi: phanHoi._id.toString(),
          thoi_gian_phan_hoi: phanHoi.thoi_gian_phan_hoi.toString(),
        };
      }),
    );

    return { data, total };
  }

  async getSoPhanHoiTrongKhaoSatCuaNguoiDung(
    khaoSatId: string,
    nguoiDungId,
  ): Promise<number> {
    const ans = this.phanHoiModel.countDocuments({
      ma_khao_sat: khaoSatId,
      ma_nguoi_dung: nguoiDungId,
    });
    return ans;
  }

  async tangBoDemSauKhiTaoPhanHoi(
    maKhaoSat: string,
    maNguoiDung: string,
  ): Promise<void> {
    const { donViIds, vungMienIds } =
      await this.nguoiDungService.getDonViIDsAndVungMienIDs(maNguoiDung);

    await Promise.all(
      donViIds.map(async (maDonVi) => {
        await this.gioiHanDonViService.tangSoPhanHoiHienTai(maKhaoSat, maDonVi);
      }),
    );

    await Promise.all(
      vungMienIds.map(async (maVungMien) => {
        await this.gioiHanVungMienService.tangSoPhanHoiHienTai(
          maKhaoSat,
          maVungMien,
        );
      }),
    );
  }

  async getPhanHoiByMaKhaoSat(maKhaoSat: string): Promise<PhanHoi[]> {
    const ans = await this.phanHoiModel.find({ ma_khao_sat: maKhaoSat });
    return ans;
  }
}
