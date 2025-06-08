import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { DonVi } from 'src/modules/don-vi/schema/don-vi.schema';
import { KhaoSat } from 'src/modules/khao-sat/schema/khao-sat.schema';

export type PhanHoiDonViDocument = PhanHoiDonVi & Document;

@Schema({ timestamps: true })
export class PhanHoiDonVi {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: KhaoSat.name, required: true })
  ma_khao_sat: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: DonVi.name, required: true })
  ma_don_vi: Types.ObjectId;

  @Prop({ default: 0 })
  so_luong_phan_hoi_hien_tai: number;
}
export const PhanHoiDonViSchema = SchemaFactory.createForClass(PhanHoiDonVi);
