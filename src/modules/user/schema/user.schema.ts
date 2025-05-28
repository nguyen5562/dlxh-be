import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Role' })
  ma_nhom: Types.ObjectId;

  @Prop({ required: true, unique: true })
  ten_dang_nhap: string;

  @Prop({ required: true })
  mat_khau: string;

  @Prop()
  ten_nguoi_dung: string;

  @Prop()
  email: string;

  @Prop()
  so_dien_thoai: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
