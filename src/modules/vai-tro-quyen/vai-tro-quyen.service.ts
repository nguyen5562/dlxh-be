import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  VaiTroQuyen,
  VaiTroQuyenDocument,
} from './schema/vai-tro-quyen.schema';
import { Model, Types } from 'mongoose';
import { CreateVaiTroQuyenDTO } from './dto/create-vai-tro-quyen.dto';
import { UpdateVaiTroQuyenDTO } from './dto/update-vai-tro-quyen.dto';
import { Quyen } from '../quyen/schema/quyen.schema';
import { QuyenService } from '../quyen/quyen.service';

@Injectable()
export class VaiTroQuyenService {
  constructor(
    @InjectModel(VaiTroQuyen.name)
    private readonly vaiTroQuyenModel: Model<VaiTroQuyenDocument>,

    private readonly quyenService: QuyenService,
  ) {}

  async createVaiTroQuyen(
    createVaiTroQuyenDto: CreateVaiTroQuyenDTO,
  ): Promise<VaiTroQuyen> {
    const newVaiTroQuyen =
      await this.vaiTroQuyenModel.create(createVaiTroQuyenDto);
    return newVaiTroQuyen;
  }

  async updateVaiTroQuyen(
    id: string,
    updateVaiTroQuyenDto: UpdateVaiTroQuyenDTO,
  ): Promise<VaiTroQuyen> {
    const updated = await this.vaiTroQuyenModel.findByIdAndUpdate(
      id,
      updateVaiTroQuyenDto,
      {
        new: true,
      },
    );
    if (!updated) throw new NotFoundException(`Not found`);
    return updated;
  }

  async deleteVaiTroQuyen(id: string): Promise<any> {
    const result = await this.vaiTroQuyenModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Not found`);
    return {
      message: 'Deleted successfully',
      statusCode: 200,
    };
  }

  async deleteVaiTroQuyenByVaiTroId(vaiTroId: string): Promise<any> {
    const result = await this.vaiTroQuyenModel.deleteMany({
      ma_vai_tro: new Types.ObjectId(vaiTroId),
    });
    if (!result) throw new NotFoundException(`Not found`);
    return {
      message: 'Deleted successfully',
      statusCode: 200,
    };
  }

  async getVaiTroQuyenByVaiTroId(vaiTroId: string): Promise<VaiTroQuyen[]> {
    return await this.vaiTroQuyenModel.find({ ma_vai_tro: vaiTroId });
  }

  async addQuyensToVaiTro(vaiTroId: string, quyenIds: string[]): Promise<void> {
    const vaiTroQuyens = quyenIds.map((quyenId) => ({
      ma_vai_tro: new Types.ObjectId(vaiTroId),
      ma_quyen: new Types.ObjectId(quyenId),
    }));

    await this.vaiTroQuyenModel.insertMany(vaiTroQuyens);
  }

  async removeQuyensFromVaiTro(
    vaiTroId: string,
    quyenIds: string[],
  ): Promise<any> {
    await this.vaiTroQuyenModel.deleteMany({
      ma_vai_tro: new Types.ObjectId(vaiTroId),
      ma_quyen: { $in: quyenIds.map((quyenId) => new Types.ObjectId(quyenId)) },
    });
  }

  async getQuyensByVaiTroId(vaiTroId: string): Promise<Quyen[]> {
    const vaiTroQuyens = await this.vaiTroQuyenModel.find({
      ma_vai_tro: new Types.ObjectId(vaiTroId),
    });
    if (vaiTroQuyens.length === 0) return [];
    const quyenIds = vaiTroQuyens.map((vaiTroQuyen) =>
      vaiTroQuyen.ma_quyen.toString(),
    );
    return await this.quyenService.getQuyensByIds(quyenIds);
  }
}
