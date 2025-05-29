import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NguoiDung, NguoiDungSchema } from './schema/nguoi-dung.schema';
import { NguoiDungService } from './nguoi-dung.service';
import { NguoiDungController } from './nguoi-dung.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NguoiDung.name, schema: NguoiDungSchema },
    ]),
  ],
  controllers: [NguoiDungController],
  providers: [NguoiDungService],
  exports: [NguoiDungService],
})
export class NguoiDungModule {}
