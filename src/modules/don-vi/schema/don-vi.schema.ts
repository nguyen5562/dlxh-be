import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { VungMien } from '../../vung-mien/schema/vung-mien.schema';

export type DonViDocument = DonVi & Document;

@Schema({ timestamps: true })
export class DonVi {
  _id: Types.ObjectId;

  @Prop({ required: true })
  ten_don_vi: string;

  @Prop({ required: true })
  nganh: string;

  @Prop({ type: Types.ObjectId, ref: DonVi.name, default: null })
  ma_don_vi_cha: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: VungMien.name, default: null })
  ma_vung_mien: Types.ObjectId;

  @Prop({ required: true })
  ma_phan_cap: string;
}

export const DonViSchema = SchemaFactory.createForClass(DonVi);
