import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DonVi, DonViSchema } from './schema/don-vi.schema';
import { DonViController } from './don-vi.controller';
import { DonViService } from './don-vi.service';
import { VungMienModule } from '../vung-mien/vung-mien.module';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DonVi.name, schema: DonViSchema }]),
    VungMienModule,
    forwardRef(() => NguoiDungModule),
  ],
  controllers: [DonViController],
  providers: [DonViService],
  exports: [DonViService],
})
export class DonViModule {}
