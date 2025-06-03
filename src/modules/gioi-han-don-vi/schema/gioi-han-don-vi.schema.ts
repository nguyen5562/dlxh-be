import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { KhaoSat } from '../../khao-sat/schema/khao-sat.schema';
import { DonVi } from '../../don-vi/schema/don-vi.schema';

export type GioiHanDonViDocument = GioiHanDonVi & Document;

@Schema({ timestamps: true })
export class GioiHanDonVi {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: KhaoSat.name, required: true })
  ma_khao_sat: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: DonVi.name, required: true })
  ma_don_vi: Types.ObjectId;

  @Prop()
  so_luong_phan_hoi_toi_da: number;

  @Prop({ default: 0 })
  so_luong_phan_hoi_hien_tai: number;
}

export const GioiHanDonViSchema = SchemaFactory.createForClass(GioiHanDonVi);
