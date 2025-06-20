import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { KhaoSat } from '../../../modules/khao-sat/schema/khao-sat.schema';
import { VungMien } from '../../../modules/vung-mien/schema/vung-mien.schema';

export type PhanHoiVungMienDocument = PhanHoiVungMien & Document;

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
export const PhanHoiVungMienSchema =
  SchemaFactory.createForClass(PhanHoiVungMien);
