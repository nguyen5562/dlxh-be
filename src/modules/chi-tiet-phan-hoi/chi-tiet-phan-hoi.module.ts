import { Module } from '@nestjs/common';
import { ChiTietPhanHoiService } from './chi-tiet-phan-hoi.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ChiTietPhanHoi,
  ChiTietPhanHoiSchema,
} from './schema/chi-tiet-phan-hoi.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChiTietPhanHoi.name, schema: ChiTietPhanHoiSchema },
    ]),
  ],
  controllers: [],
  providers: [ChiTietPhanHoiService],
  exports: [ChiTietPhanHoiService],
})
export class ChiTietPhanHoiModule {}
