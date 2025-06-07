import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GioiHanDonViService } from './gioi-han-don-vi.service';
import { GioiHanDonViController } from './gioi-han-don-vi.controller';
import {
  GioiHanDonVi,
  GioiHanDonViSchema,
} from './schema/gioi-han-don-vi.schema';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GioiHanDonVi.name, schema: GioiHanDonViSchema },
    ]),
    forwardRef(() => NguoiDungModule),
  ],
  controllers: [GioiHanDonViController],
  providers: [GioiHanDonViService],
  exports: [GioiHanDonViService],
})
export class GioiHanDonViModule {}
