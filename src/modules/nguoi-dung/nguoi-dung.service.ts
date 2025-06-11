import {
  BadRequestException,
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
import { RegisterDTO } from './dto/resgiter.dto';
import { DEFAULT_PASSWORD } from '../../const/default.const';
import { generateUniqueString } from '../../utils/gen-string';
import { VungMienService } from '../vung-mien/vung-mien.service';
import { DonViService } from '../don-vi/don-vi.service';
import { GioiHanDonViService } from '../gioi-han-don-vi/gioi-han-don-vi.service';
import { GioiHanVungMienService } from '../gioi-han-vung-mien/gioi-han-vung-mien.service';
import { KhaoSatService } from '../khao-sat/khao-sat.service';
import { PhanHoiService } from '../phan-hoi/phan-hoi.service';
import { FilterType } from 'src/middleware/filter.middleware';

@Injectable()
export class NguoiDungService {
  constructor(
    @InjectModel(NguoiDung.name)
    private readonly nguoiDungModel: Model<NguoiDungDocument>,

    @Inject(forwardRef(() => VaiTroService))
    private readonly vaiTroService: VaiTroService,

    @Inject(forwardRef(() => VungMienService))
    private readonly vungMienService: VungMienService,

    @Inject(forwardRef(() => DonViService))
    private readonly donViService: DonViService,

    @Inject(forwardRef(() => GioiHanDonViService))
    private readonly gioiHanDonViService: GioiHanDonViService,

    @Inject(forwardRef(() => GioiHanVungMienService))
    private readonly gioiHanVungMienService: GioiHanVungMienService,

    @Inject(forwardRef(() => KhaoSatService))
    private readonly khaoSatService: KhaoSatService,

    @Inject(forwardRef(() => PhanHoiService))
    private readonly phanHoiService: PhanHoiService,
  ) {}

  async createNguoiDung(
    createNguoiDungDto: CreateNguoiDungDTO,
  ): Promise<NguoiDung> {
    const checkUser = await this.nguoiDungModel.findOne({
      ten_dang_nhap: createNguoiDungDto.ten_dang_nhap,
    });
    if (checkUser) throw new BadRequestException('Tên đăng nhập đã tồn tại');

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
    const checkUser = await this.nguoiDungModel.findOne({
      ten_dang_nhap: updateNguoiDungDto.ten_dang_nhap,
    });
    if (checkUser) throw new BadRequestException('Tên đăng nhập đã tồn tại');

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
    filter: FilterType,
    pagination: PaginationType,
  ): Promise<{ data: NguoiDung[]; total: number }> {
    const search = filter.text_search
      ? {
          ten_nguoi_dung: { $regex: filter.text_search, $options: 'i' },
        }
      : {};
    
    const [data, total] = await Promise.all([
      this.nguoiDungModel
        .find(search)
        .skip(pagination.skip)
        .limit(pagination.limit),
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

  async getNguoiDungAndDonViById(id: string): Promise<NguoiDung> {
    const user = await this.nguoiDungModel.findById(id).populate('ma_don_vi');
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

  async register(registerDto: RegisterDTO): Promise<NguoiDung> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, salt);
    const newUser = await this.nguoiDungModel.create({
      ...registerDto,
      mat_khau: hashedPassword,
      ten_dang_nhap: generateUniqueString(),
    });

    return newUser;
  }

  async getDonViIDsAndVungMienIDs(
    maNguoiDung: string,
  ): Promise<{ donViIds: string[]; vungMienIds: string[] }> {
    const nguoiDung = await this.nguoiDungModel.findById(maNguoiDung);
    if (!nguoiDung)
      throw new BadRequestException('Người dùng này không tồn tại');
    let donVi = await this.donViService.getDonViById(
      nguoiDung.ma_don_vi.toString(),
    );

    const donViIds: string[] = [];
    const vungMienIds: string[] = [];

    // ✅ Lặp đơn vị cha
    while (donVi) {
      donViIds.push(donVi._id.toString());

      // ✅ Gom vùng miền tương ứng đơn vị hiện tại
      if (donVi.ma_vung_mien) {
        let vung = await this.vungMienService.getVungMienById(
          donVi.ma_vung_mien.toString(),
        );
        while (vung) {
          if (!vungMienIds.includes(vung._id.toString())) {
            vungMienIds.push(vung._id.toString());
          }
          if (!vung.ma_vung_mien_cha) break;
          vung = await this.vungMienService.getVungMienById(
            vung.ma_vung_mien_cha.toString(),
          );
        }
      }

      if (!donVi.ma_don_vi_cha) break;
      donVi = await this.donViService.getDonViById(
        donVi.ma_don_vi_cha.toString(),
      );
    }

    return { donViIds, vungMienIds };
  }

  async checkVungMienAndDonVi(
    maKhaoSat: string,
    maNguoiDung: string,
  ): Promise<boolean> {
    const { donViIds, vungMienIds } =
      await this.getDonViIDsAndVungMienIDs(maNguoiDung);

    // 🔍 Kiểm tra giới hạn đơn vị
    for (const maDonVi of donViIds) {
      const gioiHan =
        await this.gioiHanDonViService.getGioiHanByMaKhaoSatAndMaDonVi(
          maKhaoSat,
          maDonVi,
        );
      const hienTai =
        await this.gioiHanDonViService.getSoPhanHoiByMaKhaoSatAndMaDonVi(
          maKhaoSat,
          maDonVi,
        );

      if (!gioiHan) return false;
      else if (
        (hienTai?.so_luong_phan_hoi_hien_tai ?? 0) >=
        gioiHan.so_luong_phan_hoi_toi_da
      )
        return false;
    }

    // 🔍 Kiểm tra giới hạn vùng miền
    for (const maVung of vungMienIds) {
      const gioiHan =
        await this.gioiHanVungMienService.getGioiHanByMaKhaoSatAndMaVungMien(
          maKhaoSat,
          maVung,
        );
      const hienTai =
        await this.gioiHanVungMienService.getSoPhanHoiByMaKhaoSatAndMaVungMien(
          maKhaoSat,
          maVung,
        );

      if (!gioiHan) return false;
      else if (
        (hienTai?.so_luong_phan_hoi_hien_tai ?? 0) >=
        gioiHan.so_luong_phan_hoi_toi_da
      )
        return false;
    }

    return true;
  }

  async checkGioiHanPhanHoi(
    maKhaoSat: string,
    maNguoiDung: string,
  ): Promise<boolean> {
    // Kiểm tra xem khảo sát còn đc phản hồi ko
    const khaoSat = await this.khaoSatService.getKhaoSatById(maKhaoSat);
    if (!khaoSat.trang_thai) return false;

    // Kiểm tra xem đã đạt giới hạn phản hồi chưa
    if (khaoSat.so_phan_hoi_hien_tai >= khaoSat.gioi_han_phan_hoi) return false;

    // Kiểm tra xem người dùng đã vượt quá số lần phản hồi chưa
    const countPhanHoi =
      await this.phanHoiService.getSoPhanHoiTrongKhaoSatCuaNguoiDung(
        maKhaoSat,
        maNguoiDung,
      );
    if (countPhanHoi >= khaoSat.gioi_han_phan_hoi_moi_nguoi) return false;

    return true;
  }

  async getNguoiDungByListId(
    danhSachNguoiDung: string[],
  ): Promise<NguoiDung[]> {
    const objectIds = danhSachNguoiDung.map((id) => new Types.ObjectId(id));
    const ans = await this.nguoiDungModel.find({
      _id: { $in: objectIds },
    });

    return ans;
  }
}
