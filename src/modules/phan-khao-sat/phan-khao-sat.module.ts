import { Module } from '@nestjs/common';
import { PhanKhaoSatController } from './phan-khao-sat.controller';
import { PhanKhaoSatService } from './phan-khao-sat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PhanKhaoSat, PhanKhaoSatSchema } from './schema/phan-khao-sat.schema';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';
import { CauHoiModule } from '../cau-hoi/cau-hoi.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PhanKhaoSat.name, schema: PhanKhaoSatSchema },
    ]),
    NguoiDungModule,
    CauHoiModule,
  ],
  controllers: [PhanKhaoSatController],
  providers: [PhanKhaoSatService],
  exports: [PhanKhaoSatService],
})
export class PhanKhaoSatModule {}
