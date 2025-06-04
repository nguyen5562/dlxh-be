import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PhanHoiDocument = PhanHoi & Document;

@Schema({ timestamps: true })
export class PhanHoi {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'KhaoSat', required: true })
  ma_khao_sat: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'NguoiDung', default: null })
  ma_nguoi_dung: Types.ObjectId;

  @Prop()
  ghi_chu: string;

  @Prop({ default: Date.now })
  thoi_gian_phan_hoi: Date;
}

export const PhanHoiSchema = SchemaFactory.createForClass(PhanHoi);
