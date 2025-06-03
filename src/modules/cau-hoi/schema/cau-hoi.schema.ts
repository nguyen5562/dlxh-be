import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PhanKhaoSat } from '../../phan-khao-sat/schema/phan-khao-sat.schema';

export type CauHoiDocument = CauHoi & Document;

@Schema({ timestamps: true })
export class CauHoi {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: PhanKhaoSat.name, required: true })
  ma_phan_khao_sat: Types.ObjectId;

  @Prop({ required: true })
  noi_dung: string;

  @Prop({ required: true })
  loai_cau_hoi: string;

  @Prop({ required: true, default: false })
  bat_buoc: boolean;
}

export const CauHoiSchema = SchemaFactory.createForClass(CauHoi);
