import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VaiTro, VaiTroDocument } from './schema/vai-tro.schema';
import { Model } from 'mongoose';
import { CreateVaiTroDto } from './dto/create-vai-tro.dto';
import { UpdateVaiTroDto } from './dto/update-vai-tro.dto';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { VaiTroQuyenService } from '../vai-tro-quyen/vai-tro-quyen.service';
import { AddQuyenToVaiTroDto } from './dto/add-quyen-to-vai-tro.dto';
import { Quyen } from '../quyen/schema/quyen.schema';
import { RemoveQuyenFromVaiTroDto } from './dto/remove-quyen-from-vai-tro.dto';

@Injectable()
export class VaiTroService {
  constructor(
    @InjectModel(VaiTro.name)
    private readonly vaiTroModel: Model<VaiTroDocument>,

    @Inject(forwardRef(() => NguoiDungService))
    private readonly nguoiDungService: NguoiDungService,

    private readonly vaiTroQuyenService: VaiTroQuyenService,
  ) {}

  async createVaiTro(createVaiTroDto: CreateVaiTroDto): Promise<VaiTro> {
    const newRole = await this.vaiTroModel.create(createVaiTroDto);
    return newRole;
  }

  async updateVaiTro(
    id: string,
    updateVaiTroDto: UpdateVaiTroDto,
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

  async deleteVaiTro(id: string): Promise<any> {
    // Xóa tất cả vai trò của người dùng có vai trò này
    await this.nguoiDungService.xoaVaiTroChoNguoiDungByVaiTroId(id);

    // Xóa tất cả quyền của vai trò này
    await this.vaiTroQuyenService.deleteVaiTroQuyenByVaiTroId(id);

    // Xóa vai trò
    const result = await this.vaiTroModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`VaiTro not found`);
    return {
      message: 'VaiTro deleted successfully',
      statusCode: 200,
    };
  }

  async getAllVaiTros(): Promise<VaiTro[]> {
    return await this.vaiTroModel.find();
  }

  async getVaiTroById(id: string): Promise<VaiTro> {
    const vaiTro = await this.vaiTroModel.findById(id);
    if (!vaiTro) throw new NotFoundException(`VaiTro not found`);
    return vaiTro;
  }

  async addQuyensToVaiTro(
    id: string,
    addQuyensToVaiTroDto: AddQuyenToVaiTroDto,
  ): Promise<any> {
    const vaiTro = await this.vaiTroModel.findById(id);
    if (!vaiTro) throw new NotFoundException(`VaiTro not found`);

    await this.vaiTroQuyenService.addQuyensToVaiTro(
      id,
      addQuyensToVaiTroDto.quyen_ids,
    );

    return {
      message: 'Quyền đã được thêm vào vai trò',
      statusCode: 200,
    };
  }

  async removeQuyensFromVaiTro(
    id: string,
    removeQuyensFromVaiTroDto: RemoveQuyenFromVaiTroDto,
  ): Promise<any> {
    const vaiTro = await this.vaiTroModel.findById(id);
    if (!vaiTro) throw new NotFoundException(`VaiTro not found`);

    await this.vaiTroQuyenService.removeQuyensFromVaiTro(
      id,
      removeQuyensFromVaiTroDto.quyen_ids,
    );

    return {
      message: 'Quyền đã được xóa khỏi vai trò',
      statusCode: 200,
    };
  }

  async getQuyensByVaiTroId(id: string): Promise<Quyen[]> {
    const vaiTro = await this.vaiTroModel.findById(id);
    if (!vaiTro) throw new NotFoundException(`Not found`);

    const quyens = await this.vaiTroQuyenService.getQuyensByVaiTroId(id);
    if (quyens.length === 0)
      throw new NotFoundException(`Vai trò không có quyền`);

    return quyens;
  }
}
