import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CauHoi } from '../../cau-hoi/schema/cau-hoi.schema';

export type DapAnDocument = DapAn & Document;

@Schema({ timestamps: true })
export class DapAn {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: CauHoi.name, required: true })
  ma_cau_hoi: Types.ObjectId;

  @Prop({ required: true })
  gia_tri: string;

  @Prop({ required: true })
  loai_dap_an: string;
}

export const DapAnSchema = SchemaFactory.createForClass(DapAn);
