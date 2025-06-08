import { Module } from '@nestjs/common';
import { ThongKeService } from './thong-ke.service';
import { ThongKeController } from './thong-ke.controller';
import { DonViModule } from '../don-vi/don-vi.module';
import { GioiHanDonViModule } from '../gioi-han-don-vi/gioi-han-don-vi.module';
import { VungMienModule } from '../vung-mien/vung-mien.module';
import { GioiHanVungMienModule } from '../gioi-han-vung-mien/gioi-han-vung-mien.module';
import { PhanHoiModule } from '../phan-hoi/phan-hoi.module';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';

@Module({
  imports: [
    DonViModule,
    GioiHanDonViModule,
    VungMienModule,
    GioiHanVungMienModule,
    PhanHoiModule,
    NguoiDungModule,
  ],
  controllers: [ThongKeController],
  providers: [ThongKeService],
  exports: [ThongKeService],
})
export class ThongKeModule {}
