import { Module } from '@nestjs/common';
import { PhanHoiService } from './phan-hoi.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PhanHoi, PhanHoiSchema } from './schema/phan-hoi.schema';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';
import { PhanHoiController } from './phan-hoi.controller';
import { ChiTietPhanHoiModule } from '../chi-tiet-phan-hoi/chi-tiet-phan-hoi.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PhanHoi.name, schema: PhanHoiSchema }]),
    NguoiDungModule,
    ChiTietPhanHoiModule,
  ],
  controllers: [PhanHoiController],
  providers: [PhanHoiService],
  exports: [PhanHoiService],
})
export class PhanHoiModule {}
