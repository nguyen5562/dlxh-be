import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RolePermissionDocument = RolePermission & Document;

@Schema({ timestamps: true })
export class RolePermission {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Role', required: true })
  ma_nhom: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Permission', required: true })
  ma_quyen: Types.ObjectId;
}

export const RolePermissionSchema =
  SchemaFactory.createForClass(RolePermission);
