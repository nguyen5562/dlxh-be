import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VaiTro, VaiTroDocument } from './schema/vai-tro.schema';
import { Model } from 'mongoose';
import { CreateVaiTroDTO } from './dto/create-vai-tro.dto';
import { UpdateVaiTroDTO } from './dto/update-vai-tro.dto';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { VaiTroQuyenService } from '../vai-tro-quyen/vai-tro-quyen.service';
import { AddQuyenToVaiTroDTO } from './dto/add-quyen-to-vai-tro.dto';
import { Quyen } from '../quyen/schema/quyen.schema';
import { RemoveQuyenFromVaiTroDTO } from './dto/remove-quyen-from-vai-tro.dto';
import { PaginationType } from '../../middleware/pagination.middleware';
import { FilterType } from 'src/middleware/filter.middleware';

@Injectable()
export class VaiTroService {
  constructor(
    @InjectModel(VaiTro.name)
    private readonly vaiTroModel: Model<VaiTroDocument>,

    @Inject(forwardRef(() => NguoiDungService))
    private readonly nguoiDungService: NguoiDungService,

    private readonly vaiTroQuyenService: VaiTroQuyenService,
  ) {}

  async createVaiTro(createVaiTroDto: CreateVaiTroDTO): Promise<VaiTro> {
    const newRole = await this.vaiTroModel.create(createVaiTroDto);
    return newRole;
  }

  async updateVaiTro(
    id: string,
    updateVaiTroDto: UpdateVaiTroDTO,
  ): Promise<VaiTro> {
    const updated = await this.vaiTroModel.findByIdAndUpdate(
      id,
      updateVaiTroDto,
      {
        new: true,
      },
    );
    if (!updated) throw new NotFoundException(`VaiTro not found`);
    return updated;
  }

  async deleteVaiTro(id: string): Promise<void> {
    // Xóa tất cả vai trò của người dùng có vai trò này
    await this.nguoiDungService.xoaVaiTroChoNguoiDungByVaiTroId(id);

    // Xóa tất cả quyền của vai trò này
    await this.vaiTroQuyenService.deleteVaiTroQuyenByVaiTroId(id);

    // Xóa vai trò
    const result = await this.vaiTroModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`VaiTro not found`);
  }

  async getAllVaiTros(
    filter: FilterType,
    pagination: PaginationType,
  ): Promise<{ data: VaiTro[]; total: number }> {
    const search = filter.text_search
      ? {
          ten_vai_tro: { $regex: filter.text_search, $options: 'i' },
        }
      : {};

    const [data, total] = await Promise.all([
      this.vaiTroModel
        .find(search)
        .skip(pagination.skip)
        .limit(pagination.limit),
      this.vaiTroModel.countDocuments(),
    ]);
    return { data, total };
  }

  async getVaiTroById(id: string): Promise<VaiTro> {
    const vaiTro = await this.vaiTroModel.findById(id);
    if (!vaiTro) throw new NotFoundException(`VaiTro not found`);
    return vaiTro;
  }

  async addQuyensToVaiTro(
    id: string,
    addQuyensToVaiTroDto: AddQuyenToVaiTroDTO,
  ): Promise<void> {
    const vaiTro = await this.vaiTroModel.findById(id);
    if (!vaiTro) throw new NotFoundException(`VaiTro not found`);

    await this.vaiTroQuyenService.addQuyensToVaiTro(
      id,
      addQuyensToVaiTroDto.quyen_ids,
    );
  }

  async removeQuyensFromVaiTro(
    id: string,
    removeQuyensFromVaiTroDto: RemoveQuyenFromVaiTroDTO,
  ): Promise<void> {
    const vaiTro = await this.vaiTroModel.findById(id);
    if (!vaiTro) throw new NotFoundException(`VaiTro not found`);

    await this.vaiTroQuyenService.removeQuyensFromVaiTro(
      id,
      removeQuyensFromVaiTroDto.quyen_ids,
    );
  }

  async getQuyensByVaiTroId(id: string): Promise<Quyen[]> {
    const vaiTro = await this.vaiTroModel.findById(id);
    if (!vaiTro) throw new NotFoundException(`Không tìm thấy vai trò`);

    return await this.vaiTroQuyenService.getQuyensByVaiTroId(id);
  }
}
