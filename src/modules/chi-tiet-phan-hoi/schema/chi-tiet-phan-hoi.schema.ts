import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ChiTietPhanHoiDocument = ChiTietPhanHoi & Document;

@Schema({ timestamps: true })
export class ChiTietPhanHoi {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'PhanHoi', required: true })
  ma_phan_hoi: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'CauHoi', required: true })
  ma_cau_hoi: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'DapAn', default: null })
  ma_dap_an: Types.ObjectId;

  @Prop()
  tra_loi: string;
}

export const ChiTietPhanHoiSchema =
  SchemaFactory.createForClass(ChiTietPhanHoi);
