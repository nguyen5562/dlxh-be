import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NguoiDung, NguoiDungDocument } from './schema/nguoi-dung.schema';
import { Model, Types } from 'mongoose';
import { CreateNguoiDungDTO } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDTO } from './dto/update-nguoi-dung.dto';
import * as bcrypt from 'bcrypt';
import { VaiTroService } from '../vai-tro/vai-tro.service';
import { Quyen } from '../quyen/schema/quyen.schema';
import { ChucNangHeThong } from '../../enums/chuc-nang-he-thong.enum';
import { QuyenHeThong } from '../../enums/quyen-he-thong.enum';
import { VaiTro } from '../vai-tro/schema/vai-tro.schema';
import { NguoiDungDTO } from './dto/nguoi-dung.dto';
import { PaginationType } from '../../middleware/pagination.middleware';

@Injectable()
export class NguoiDungService {
  constructor(
    @InjectModel(NguoiDung.name)
    private readonly nguoiDungModel: Model<NguoiDungDocument>,

    @Inject(forwardRef(() => VaiTroService))
    private readonly vaiTroService: VaiTroService,
  ) {}

  async createNguoiDung(
    createNguoiDungDto: CreateNguoiDungDTO,
  ): Promise<NguoiDung> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createNguoiDungDto.mat_khau, salt);

    const newNguoiDung = await this.nguoiDungModel.create({
      ...createNguoiDungDto,
      mat_khau: hashedPassword,
    });

    return newNguoiDung;
  }

  async updateNguoiDung(
    id: string,
    updateNguoiDungDto: UpdateNguoiDungDTO,
  ): Promise<NguoiDung> {
    const updated = await this.nguoiDungModel.findByIdAndUpdate(
      id,
      updateNguoiDungDto,
      {
        new: true,
      },
    );

    if (!updated) throw new NotFoundException(`User not found`);
    return updated;
  }

  async deleteNguoiDung(id: string): Promise<void> {
    const result = await this.nguoiDungModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`User not found`);
  }

  async getAllNguoiDungs(
    pagination: PaginationType,
  ): Promise<{ data: NguoiDung[]; total: number }> {
    const [data, total] = await Promise.all([
      this.nguoiDungModel.find().skip(pagination.skip).limit(pagination.limit),
      this.nguoiDungModel.countDocuments(),
    ]);

    return { data, total };
  }

  async getAllNguoiDungsAndVaiTroAndQuyens(): Promise<NguoiDungDTO[]> {
    const users = await this.nguoiDungModel.find();

    const userDTOs: NguoiDungDTO[] = [];
    for (const user of users) {
      const result = await this.getVaiTroAndQuyensByNguoiDungId(
        user._id.toString(),
      );

      userDTOs.push({
        ...user.toObject(),
        role: result.vaiTro,
        permissions: result.quyens,
      });
    }
    return userDTOs;
  }

  async getNguoiDungById(id: string): Promise<NguoiDung> {
    const user = await this.nguoiDungModel.findById(id);
    if (!user) throw new NotFoundException(`Không tìm thấy người dùng này`);
    return user;
  }

  async getNguoiDungAndVaiTroAndQuyensById(id: string): Promise<NguoiDungDTO> {
    const user = await this.nguoiDungModel.findById(id);
    if (!user) throw new NotFoundException(`User not found`);
    const result = await this.getVaiTroAndQuyensByNguoiDungId(id);
    return {
      ...user.toObject(),
      role: result.vaiTro,
      permissions: result.quyens,
    };
  }

  async getNguoiDungByTenDangNhap(ten_dang_nhap: string): Promise<NguoiDung> {
    const user = await this.nguoiDungModel.findOne({ ten_dang_nhap });
    if (!user) throw new NotFoundException(`Người dùng này không tồn tại`);
    return user;
  }

  async xoaVaiTroChoNguoiDungByVaiTroId(vaiTroId: string): Promise<any> {
    const result = await this.nguoiDungModel.updateMany(
      { ma_vai_tro: new Types.ObjectId(vaiTroId) },
      { ma_vai_tro: null },
    );
    if (!result) throw new NotFoundException(`Not found`);
  }

  async getVaiTroByNguoiDungId(userId: string): Promise<VaiTro> {
    const nguoiDung = await this.getNguoiDungById(userId);
    if (!nguoiDung) throw new NotFoundException(`Không tìm thấy người dùng`);
    if (!nguoiDung.ma_vai_tro)
      throw new NotFoundException(`Người dùng này không có vai trò`);
    return this.vaiTroService.getVaiTroById(nguoiDung.ma_vai_tro.toString());
  }

  async getQuyensByNguoiDungId(userId: string): Promise<Quyen[]> {
    const vaiTro = await this.getVaiTroByNguoiDungId(userId);
    if (!vaiTro) throw new NotFoundException(`Không tìm thấy vai trò`);

    const quyens = await this.vaiTroService.getQuyensByVaiTroId(
      vaiTro._id.toString(),
    );

    return quyens;
  }

  async getVaiTroAndQuyensByNguoiDungId(userId: string): Promise<any> {
    const nguoiDung = await this.getNguoiDungById(userId);
    if (!nguoiDung) throw new NotFoundException(`Không tìm thấy người dùng`);
    if (!nguoiDung.ma_vai_tro)
      return {
        vaiTro: null,
        quyens: [],
      };

    const _vaiTro = await this.vaiTroService.getVaiTroById(
      nguoiDung.ma_vai_tro.toString(),
    );
    if (!_vaiTro)
      return {
        vaiTro: null,
        quyens: [],
      };

    const _quyens = await this.vaiTroService.getQuyensByVaiTroId(
      _vaiTro._id.toString(),
    );
    if (!_quyens)
      return {
        vaiTro: _vaiTro,
        quyens: [],
      };

    return {
      vaiTro: _vaiTro,
      quyens: _quyens,
    };
  }

  async checkQuyen(
    userId: string,
    module: ChucNangHeThong,
    actions: QuyenHeThong[],
  ) {
    const result = await this.getVaiTroAndQuyensByNguoiDungId(userId);
    if (!result.quyens || result.quyens.length === 0) return false;

    for (let index = 0; index < result.quyens.length; index++) {
      const quyen = result.quyens[index];
      if (
        (quyen.chuc_nang as ChucNangHeThong) === module &&
        actions.includes(quyen.quyen as QuyenHeThong)
      ) {
        return true;
      }
    }
    return false;
  }

  // async canRespond(maKhaoSat: string, maNguoiDung: string): Promise<boolean> {
  //   const nguoiDung = await this.nguoiDungModel
  //     .findById(maNguoiDung)
  //     .populate('ma_don_vi');
  //   let donVi = nguoiDung.ma_don_vi;

  //   const donViIds: string[] = [];
  //   const vungMienIds: string[] = [];

  //   // ✅ Lặp đơn vị cha
  //   while (donVi) {
  //     donViIds.push(donVi._id);

  //     // ✅ Gom vùng miền tương ứng đơn vị hiện tại
  //     if (donVi.ma_vung_mien) {
  //       let vung = await this.vungMienModel.findById(donVi.ma_vung_mien);
  //       while (vung) {
  //         if (!vungMienIds.includes(vung._id.toString())) {
  //           vungMienIds.push(vung._id);
  //         }
  //         if (!vung.ma_vung_mien_cha) break;
  //         vung = await this.vungMienModel.findById(vung.ma_vung_mien_cha);
  //       }
  //     }

  //     if (!donVi.ma_don_vi_cha) break;
  //     donVi = await this.donViModel.findById(donVi.ma_don_vi_cha);
  //   }

  //   // 🔍 Kiểm tra giới hạn đơn vị
  //   for (const maDonVi of donViIds) {
  //     const gioiHan = await this.gioiHanDonViModel.findOne({
  //       ma_khao_sat: maKhaoSat,
  //       ma_don_vi: maDonVi,
  //     });
  //     if (
  //       gioiHan &&
  //       gioiHan.so_luong_phan_hoi_hien_tai >= gioiHan.so_luong_phan_hoi_toi_da
  //     ) {
  //       return false;
  //     }
  //   }

  //   // 🔍 Kiểm tra giới hạn vùng miền
  //   for (const maVung of vungMienIds) {
  //     const gioiHan = await this.gioiHanVungModel.findOne({
  //       ma_khao_sat: maKhaoSat,
  //       ma_vung_mien: maVung,
  //     });
  //     if (
  //       gioiHan &&
  //       gioiHan.so_luong_phan_hoi_hien_tai >= gioiHan.so_luong_phan_hoi_toi_da
  //     ) {
  //       return false;
  //     }
  //   }

  //   return true;
  // }

  // async submitPhanHoi(
  //   maKhaoSat: string,
  //   maNguoiDung: string,
  //   data: any,
  // ): Promise<boolean> {
  //   const session = await this.connection.startSession();
  //   session.startTransaction();

  //   try {
  //     const nguoiDung = await this.nguoiDungModel
  //       .findById(maNguoiDung)
  //       .populate('ma_don_vi')
  //       .session(session);
  //     let donVi = nguoiDung.ma_don_vi;

  //     const donViIds: string[] = [];
  //     const vungMienIds: string[] = [];

  //     // ✅ Gom tất cả đơn vị cha
  //     while (donVi) {
  //       donViIds.push(donVi._id.toString());

  //       if (donVi.ma_vung_mien) {
  //         let vung = await this.vungMienModel
  //           .findById(donVi.ma_vung_mien)
  //           .session(session);
  //         while (vung) {
  //           if (!vungMienIds.includes(vung._id.toString())) {
  //             vungMienIds.push(vung._id.toString());
  //           }
  //           if (!vung.ma_vung_mien_cha) break;
  //           vung = await this.vungMienModel
  //             .findById(vung.ma_vung_mien_cha)
  //             .session(session);
  //         }
  //       }

  //       if (!donVi.ma_don_vi_cha) break;
  //       donVi = await this.donViModel
  //         .findById(donVi.ma_don_vi_cha)
  //         .session(session);
  //     }

  //     // 🔍 Kiểm tra giới hạn đơn vị
  //     for (const maDonVi of donViIds) {
  //       const gioiHan = await this.gioiHanDonViModel
  //         .findOne({ ma_khao_sat: maKhaoSat, ma_don_vi: maDonVi })
  //         .session(session);
  //       if (
  //         gioiHan &&
  //         gioiHan.so_luong_phan_hoi_hien_tai >= gioiHan.so_luong_phan_hoi_toi_da
  //       ) {
  //         throw new Error(`Đơn vị ${maDonVi} đã vượt giới hạn`);
  //       }
  //     }

  //     // 🔍 Kiểm tra giới hạn vùng
  //     for (const maVung of vungMienIds) {
  //       const gioiHan = await this.gioiHanVungModel
  //         .findOne({ ma_khao_sat: maKhaoSat, ma_vung_mien: maVung })
  //         .session(session);
  //       if (
  //         gioiHan &&
  //         gioiHan.so_luong_phan_hoi_hien_tai >= gioiHan.so_luong_phan_hoi_toi_da
  //       ) {
  //         throw new Error(`Vùng ${maVung} đã vượt giới hạn`);
  //       }
  //     }

  //     // ✅ Nếu hợp lệ, tạo phản hồi (giả sử có collection phản hồi)
  //     const phanHoi = await this.phanHoiModel.create(
  //       [
  //         {
  //           ma_khao_sat: maKhaoSat,
  //           ma_nguoi_dung: maNguoiDung,
  //           ...data,
  //         },
  //       ],
  //       { session },
  //     );

  //     // 🔄 Cập nhật số lượng phản hồi đơn vị
  //     await Promise.all(
  //       donViIds.map((ma) =>
  //         this.gioiHanDonViModel.updateOne(
  //           { ma_khao_sat: maKhaoSat, ma_don_vi: ma },
  //           { $inc: { so_luong_phan_hoi_hien_tai: 1 } },
  //           { session },
  //         ),
  //       ),
  //     );

  //     // 🔄 Cập nhật số lượng phản hồi vùng miền
  //     await Promise.all(
  //       vungMienIds.map((ma) =>
  //         this.gioiHanVungModel.updateOne(
  //           { ma_khao_sat: maKhaoSat, ma_vung_mien: ma },
  //           { $inc: { so_luong_phan_hoi_hien_tai: 1 } },
  //           { session },
  //         ),
  //       ),
  //     );

  //     await session.commitTransaction();
  //     session.endSession();

  //     return true;
  //   } catch (err) {
  //     await session.abortTransaction();
  //     session.endSession();
  //     console.error('submitPhanHoi error:', err.message);
  //     return false;
  //   }
  // }
}
