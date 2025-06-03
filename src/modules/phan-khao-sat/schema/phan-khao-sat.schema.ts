import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { KhaoSat } from '../../khao-sat/schema/khao-sat.schema';

export type PhanKhaoSatDocument = PhanKhaoSat & Document;

@Schema({ timestamps: true })
export class PhanKhaoSat {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: KhaoSat.name, required: true })
  ma_khao_sat: Types.ObjectId;

  @Prop({ required: true })
  tieu_de: string;

  @Prop({ required: true })
  mo_ta: string;
}

export const PhanKhaoSatSchema = SchemaFactory.createForClass(PhanKhaoSat);
