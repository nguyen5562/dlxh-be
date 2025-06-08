import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { KhaoSat } from '../../khao-sat/schema/khao-sat.schema';
import { VungMien } from '../../vung-mien/schema/vung-mien.schema';

export type GioiHanVungMienDocument = GioiHanVungMien & Document;

@Schema({ timestamps: true })
export class GioiHanVungMien {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: KhaoSat.name, required: true })
  ma_khao_sat: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: VungMien.name, required: true })
  ma_vung_mien: Types.ObjectId;

  @Prop()
  so_luong_phan_hoi_toi_da: number;
}

export const GioiHanVungMienSchema =
  SchemaFactory.createForClass(GioiHanVungMien);
