import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { VaiTro } from '../../vai-tro/schema/vai-tro.schema';
import { DonVi } from '../../don-vi/schema/don-vi.schema';

export type NguoiDungDocument = NguoiDung & Document;

@Schema({ timestamps: true })
export class NguoiDung {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: VaiTro.name, default: null })
  ma_vai_tro: Types.ObjectId;

  @Prop({ required: true, unique: true })
  ten_dang_nhap: string;

  @Prop({ required: true })
  mat_khau: string;

  @Prop({ required: true })
  ten_nguoi_dung: string;

  @Prop({ required: true })
  gioi_tinh: string;

  @Prop()
  email: string;

  @Prop()
  sdt: string;

  @Prop({ type: Types.ObjectId, ref: DonVi.name, required: true })
  ma_don_vi: Types.ObjectId;
}

export const NguoiDungSchema = SchemaFactory.createForClass(NguoiDung);
