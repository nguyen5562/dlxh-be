import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VaiTroQuyenSchema } from './schema/vai-tro-quyen.schema';
import { VaiTroQuyenService } from './vai-tro-quyen.service';
import { QuyenModule } from '../quyen/quyen.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'VaiTroQuyen', schema: VaiTroQuyenSchema },
    ]),
    QuyenModule,
  ],
  controllers: [],
  providers: [VaiTroQuyenService],
  exports: [VaiTroQuyenService],
})
export class VaiTroQuyenModule {}
