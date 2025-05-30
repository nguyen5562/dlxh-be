import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type QuyenDocument = Quyen & Document;

@Schema({ timestamps: true })
export class Quyen {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  chuc_nang: string;

  @Prop({ required: true, unique: true })
  quyen: string;
}

export const QuyenSchema = SchemaFactory.createForClass(Quyen);
