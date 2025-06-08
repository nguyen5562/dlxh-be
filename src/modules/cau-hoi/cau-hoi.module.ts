import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CauHoi, CauHoiSchema } from './schema/cau-hoi.schema';
import { CauHoiController } from './cau-hoi.controller';
import { CauHoiService } from './cau-hoi.service';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';
import { DapAnModule } from '../dap-an/dap-an.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CauHoi.name, schema: CauHoiSchema }]),
    forwardRef(() => NguoiDungModule),
    DapAnModule,
  ],
  controllers: [CauHoiController],
  providers: [CauHoiService],
  exports: [CauHoiService],
})
export class CauHoiModule {}
