import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NguoiDung, NguoiDungDocument } from './schema/nguoi-dung.schema';
import { Model, Types } from 'mongoose';
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class NguoiDungService {
  constructor(
    @InjectModel(NguoiDung.name)
    private readonly nguoiDungModel: Model<NguoiDungDocument>,
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

  async deleteNguoiDung(id: string): Promise<any> {
    const result = await this.nguoiDungModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`User not found`);
    return {
      message: 'User deleted successfully',
      statusCode: 200,
    };
  }

  async getAllNguoiDungs(): Promise<NguoiDung[]> {
    return await this.nguoiDungModel.find();
  }

  async getNguoiDungById(id: string): Promise<NguoiDung> {
    const user = await this.nguoiDungModel.findById(id);
    if (!user) throw new NotFoundException(`User not found`);
    return user;
  }

  async getNguoiDungByTenDangNhap(ten_dang_nhap: string): Promise<NguoiDung> {
    const user = await this.nguoiDungModel.findOne({ ten_dang_nhap });
    if (!user) throw new NotFoundException(`User not found`);
    return user;
  }

  async getNguoiDungByMaVaiTro(ma_vai_tro: string): Promise<NguoiDung[]> {
    const users = await this.nguoiDungModel.find({ ma_vai_tro });
    if (!users) throw new NotFoundException(`Users not found`);
    return users;
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
}
