import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DapAn, DapAnSchema } from './schema/dap-an.schema';
import { DapAnController } from './dap-an.controller';
import { DapAnService } from './dap-an.service';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DapAn.name, schema: DapAnSchema }]),
    forwardRef(() => NguoiDungModule),
  ],
  controllers: [DapAnController],
  providers: [DapAnService],
  exports: [DapAnService],
})
export class DapAnModule {}
