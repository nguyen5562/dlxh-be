import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { NguoiDung } from '../../nguoi-dung/schema/nguoi-dung.schema';

export type KhaoSatDocument = KhaoSat & Document;

@Schema({ timestamps: true })
export class KhaoSat {
  _id: Types.ObjectId;

  @Prop({ required: true })
  tieu_de: string;

  @Prop()
  mo_ta: string;

  @Prop({ type: Types.ObjectId, ref: NguoiDung.name, default: null })
  ma_nguoi_tao: Types.ObjectId;

  @Prop({ required: true })
  thoi_gian_bat_dau: Date;

  @Prop({ required: true })
  thoi_gian_ket_thuc: Date;

  @Prop({ required: true })
  gioi_han_phan_hoi: number;

  @Prop({ default: 0 })
  so_phan_hoi_hien_tai: number;

  @Prop({ required: true, default: false })
  cho_phep_tra_loi_nhieu_lan: boolean;

  @Prop()
  gioi_han_phan_hoi_moi_nguoi: number;

  @Prop({ required: true, default: false })
  cho_phep_an_danh: boolean;

  @Prop({ default: true })
  trang_thai: boolean;
}

export const KhaoSatSchema = SchemaFactory.createForClass(KhaoSat);
