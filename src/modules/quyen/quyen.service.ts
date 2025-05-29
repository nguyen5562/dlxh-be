import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quyen, QuyenDocument } from './schema/quyen.schema';
import { Model, Types } from 'mongoose';
import { CreateQuyenDto } from './dto/create-quyen.dto';
import { UpdateQuyenDto } from './dto/update-quyen.dto';

@Injectable()
export class QuyenService {
  constructor(
    @InjectModel(Quyen.name)
    private readonly quyenModel: Model<QuyenDocument>,
  ) {}

  async createQuyen(createQuyenDto: CreateQuyenDto): Promise<Quyen> {
    const newQuyen = await this.quyenModel.create(createQuyenDto);
    return newQuyen;
  }

  async updateQuyen(
    id: string,
    updateQuyenDto: UpdateQuyenDto,
  ): Promise<Quyen> {
    const updated = await this.quyenModel.findByIdAndUpdate(
      id,
      updateQuyenDto,
      {
        new: true,
      },
    );
    if (!updated) throw new NotFoundException(`Quyen not found`);
    return updated;
  }

  async deleteQuyen(id: string): Promise<any> {
    const result = await this.quyenModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Quyen not found`);
    return {
      message: 'Quyen deleted successfully',
      statusCode: 200,
    };
  }

  async findAllQuyens(): Promise<Quyen[]> {
    return await this.quyenModel.find();
  }

  async findQuyenById(id: string): Promise<Quyen> {
    const quyen = await this.quyenModel.findById(id);
    if (!quyen) throw new NotFoundException(`Quyen not found`);
    return quyen;
  }

  async getQuyensByIds(ids: string[]): Promise<Quyen[]> {
    const quyens = await this.quyenModel.find({
      _id: { $in: ids.map((id) => new Types.ObjectId(id)) },
    });
    return quyens;
  }
}
