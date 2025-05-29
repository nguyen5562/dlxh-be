import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Quyen, QuyenSchema } from './schema/quyen.schema';
import { QuyenService } from './quyen.service';
import { QuyenController } from './quyen.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quyen.name, schema: QuyenSchema }]),
  ],
  controllers: [QuyenController],
  providers: [QuyenService],
  exports: [QuyenService],
})
export class QuyenModule {}
