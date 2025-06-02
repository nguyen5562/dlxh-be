import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VungMienDocument = VungMien & Document;

@Schema({ timestamps: true })
export class VungMien {
  _id: Types.ObjectId;

  @Prop({ required: true })
  ten_vung_mien: string;

  @Prop({ type: Types.ObjectId, ref: VungMien.name, default: null })
  ma_vung_mien_cha: Types.ObjectId;

  @Prop({ required: true })
  ma_phan_cap: string;
}

export const VungMienSchema = SchemaFactory.createForClass(VungMien);
