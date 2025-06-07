import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VungMien, VungMienSchema } from './schema/vung-mien.schema';
import { VungMienController } from './vung-mien.controller';
import { VungMienService } from './vung-mien.service';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VungMien.name, schema: VungMienSchema },
    ]),
    forwardRef(() => NguoiDungModule),
  ],
  controllers: [VungMienController],
  providers: [VungMienService],
  exports: [VungMienService],
})
export class VungMienModule {}
