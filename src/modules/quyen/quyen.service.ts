import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quyen, QuyenDocument } from './schema/quyen.schema';
import { Model, Types } from 'mongoose';
import { CreateQuyenDTO } from './dto/create-quyen.dto';
import { UpdateQuyenDTO } from './dto/update-quyen.dto';
import { PaginationType } from '../../middleware/pagination.middleware';

@Injectable()
export class QuyenService {
  constructor(
    @InjectModel(Quyen.name)
    private readonly quyenModel: Model<QuyenDocument>,
  ) {}

  async createQuyen(createQuyenDto: CreateQuyenDTO): Promise<Quyen> {
    const newQuyen = await this.quyenModel.create(createQuyenDto);
    return newQuyen;
  }

  async updateQuyen(
    id: string,
    updateQuyenDto: UpdateQuyenDTO,
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

  async deleteQuyen(id: string): Promise<void> {
    const result = await this.quyenModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Quyen not found`);
  }

  async findAllQuyens(
    pagination: PaginationType,
  ): Promise<{ data: Quyen[]; total: number }> {
    const [data, total] = await Promise.all([
      this.quyenModel.find().limit(pagination.limit).skip(pagination.skip),
      this.quyenModel.countDocuments(),
    ]);
    return { data, total };
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
