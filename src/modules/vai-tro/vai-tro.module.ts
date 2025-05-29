import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VaiTro, VaiTroSchema } from './schema/vai-tro.schema';
import { VaiTroService } from './vai-tro.service';
import { VaiTroController } from './vai-tro.controller';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';
import { VaiTroQuyenModule } from '../vai-tro-quyen/vai-tro-quyen.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VaiTro.name, schema: VaiTroSchema }]),
    NguoiDungModule,
    VaiTroQuyenModule,
  ],
  controllers: [VaiTroController],
  providers: [VaiTroService],
  exports: [VaiTroService],
})
export class VaiTroModule {}
