import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Quyen, QuyenSchema } from './schema/quyen.schema';
import { QuyenService } from './quyen.service';
import { QuyenController } from './quyen.controller';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quyen.name, schema: QuyenSchema }]),
    forwardRef(() => NguoiDungModule),
  ],
  controllers: [QuyenController],
  providers: [QuyenService],
  exports: [QuyenService],
})
export class QuyenModule {}
