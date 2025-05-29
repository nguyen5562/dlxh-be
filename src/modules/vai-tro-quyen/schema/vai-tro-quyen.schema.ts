import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Quyen } from '../../quyen/schema/quyen.schema';
import { VaiTro } from '../../vai-tro/schema/vai-tro.schema';

export type VaiTroQuyenDocument = VaiTroQuyen & Document;

@Schema({ timestamps: true })
export class VaiTroQuyen {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: VaiTro.name, required: true })
  ma_vai_tro: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Quyen.name, required: true })
  ma_quyen: Types.ObjectId;
}

export const VaiTroQuyenSchema = SchemaFactory.createForClass(VaiTroQuyen);
