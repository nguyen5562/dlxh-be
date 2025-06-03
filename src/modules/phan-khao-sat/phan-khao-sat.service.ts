import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PhanKhaoSat,
  PhanKhaoSatDocument,
} from './schema/phan-khao-sat.schema';
import { CreatePhanKhaoSatDto } from './dto/create-phan-khao-sat.dto';
import { UpdatePhanKhaoSatDto } from './dto/update-phan-khao-sat.dto';

@Injectable()
export class PhanKhaoSatService {
  constructor(
    @InjectModel(PhanKhaoSat.name)
    private phanKhaoSatModel: Model<PhanKhaoSatDocument>,
  ) {}

  async createPhanKhaoSat(
    createPhanKhaoSatDto: CreatePhanKhaoSatDto,
  ): Promise<PhanKhaoSat> {
    const createdPhanKhaoSat = new this.phanKhaoSatModel(createPhanKhaoSatDto);
    return createdPhanKhaoSat.save();
  }

  async updatePhanKhaoSat(
    id: string,
    updatePhanKhaoSatDto: UpdatePhanKhaoSatDto,
  ): Promise<PhanKhaoSat> {
    const updatedPhanKhaoSat = await this.phanKhaoSatModel.findByIdAndUpdate(
      id,
      updatePhanKhaoSatDto,
      {
        new: true,
      },
    );

    if (!updatedPhanKhaoSat)
      throw new NotFoundException('Phần khảo sát không tồn tại');
    return updatedPhanKhaoSat;
  }

  async deletePhanKhaoSat(id: string): Promise<void> {
    const deletedPhanKhaoSat =
      await this.phanKhaoSatModel.findByIdAndDelete(id);
    if (!deletedPhanKhaoSat)
      throw new NotFoundException('Phần khảo sát không tồn tại');
  }

  async getAllPhanKhaoSat(): Promise<PhanKhaoSat[]> {
    const phanKhaoSat = await this.phanKhaoSatModel.find();
    return phanKhaoSat;
  }

  async getPhanKhaoSatById(id: string): Promise<PhanKhaoSat> {
    const phanKhaoSat = await this.phanKhaoSatModel.findById(id);
    if (!phanKhaoSat)
      throw new NotFoundException('Phần khảo sát không tồn tại');
    return phanKhaoSat;
  }

  async getPhanKhaoSatByKhaoSatId(khaoSatId: string): Promise<PhanKhaoSat[]> {
    const phanKhaoSat = await this.phanKhaoSatModel.find({
      ma_khao_sat: khaoSatId,
    });
    return phanKhaoSat;
  }
}
