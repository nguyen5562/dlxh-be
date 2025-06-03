import { Module } from '@nestjs/common';
import { KhaoSatController } from './khao-sat.controller';
import { KhaoSatService } from './khao-sat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { KhaoSat, KhaoSatSchema } from './schema/khao-sat.schema';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: KhaoSat.name, schema: KhaoSatSchema }]),
    NguoiDungModule,
  ],
  controllers: [KhaoSatController],
  providers: [KhaoSatService],
  exports: [KhaoSatService],
})
export class KhaoSatModule {}
