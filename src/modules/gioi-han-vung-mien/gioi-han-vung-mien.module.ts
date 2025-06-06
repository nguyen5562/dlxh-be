import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GioiHanVungMienService } from './gioi-han-vung-mien.service';
import { GioiHanVungMienController } from './gioi-han-vung-mien.controller';
import {
  GioiHanVungMien,
  GioiHanVungMienSchema,
} from './schema/gioi-han-vung-mien.schema';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GioiHanVungMien.name, schema: GioiHanVungMienSchema },
    ]),
    NguoiDungModule,
  ],
  controllers: [GioiHanVungMienController],
  providers: [GioiHanVungMienService],
  exports: [GioiHanVungMienService],
})
export class GioiHanVungMienModule {}
