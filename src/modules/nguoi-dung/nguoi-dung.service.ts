import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NguoiDung, NguoiDungDocument } from './schema/nguoi-dung.schema';
import { Model, Types } from 'mongoose';
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import * as bcrypt from 'bcrypt';
import { VaiTroService } from '../vai-tro/vai-tro.service';
import { Quyen } from '../quyen/schema/quyen.schema';
import { ChucNangHeThong } from '../../enums/chuc-nang-he-thong.enum';
import { QuyenHeThong } from '../../enums/quyen-he-thong.enum';
import { VaiTro } from '../vai-tro/schema/vai-tro.schema';
import { NguoiDungDTO } from './dto/nguoi-dung.dto';

@Injectable()
export class NguoiDungService {
  constructor(
    @InjectModel(NguoiDung.name)
    private readonly nguoiDungModel: Model<NguoiDungDocument>,

    @Inject(forwardRef(() => VaiTroService))
    private readonly vaiTroService: VaiTroService,
  ) {}

  async createNguoiDung(
    createNguoiDungDto: CreateNguoiDungDto,
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
    updateNguoiDungDto: UpdateNguoiDungDto,
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

  async getAllNguoiDungs(): Promise<NguoiDung[]> {
    return await this.nguoiDungModel.find();
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

  async ganVaiTroChoNguoiDung(
    userId: string,
    roleId: string,
  ): Promise<NguoiDung> {
    const user = await this.nguoiDungModel.findByIdAndUpdate(
      userId,
      { ma_vai_tro: new Types.ObjectId(roleId) },
      { new: true },
    );

    if (!user) throw new NotFoundException(`User not found`);
    return user;
  }

  async xoaVaiTroChoNguoiDung(userId: string): Promise<NguoiDung> {
    const user = await this.nguoiDungModel.findByIdAndUpdate(
      userId,
      { ma_vai_tro: null },
      { new: true },
    );

    if (!user) throw new NotFoundException(`User not found`);
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
}
