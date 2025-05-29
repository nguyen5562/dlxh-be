import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VaiTroDocument = VaiTro & Document;

@Schema({ timestamps: true })
export class VaiTro {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  ten_vai_tro: string;

  @Prop()
  mo_ta: string;
}

export const VaiTroSchema = SchemaFactory.createForClass(VaiTro);
