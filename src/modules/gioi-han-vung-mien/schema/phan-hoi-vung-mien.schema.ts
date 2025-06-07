import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { KhaoSat } from 'src/modules/khao-sat/schema/khao-sat.schema';
import { VungMien } from 'src/modules/vung-mien/schema/vung-mien.schema';

@Schema({ timestamps: true })
export class PhanHoiVungMien {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: KhaoSat.name, required: true })
  ma_khao_sat: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: VungMien.name, required: true })
  ma_vung_mien: Types.ObjectId;

  @Prop({ default: 0 })
  so_luong_phan_hoi_hien_tai: number;
}
