import { Module } from '@nestjs/common';
import { ThongKeService } from './thong-ke.service';
import { ThongKeController } from './thong-ke.controller';
import { DonViModule } from '../don-vi/don-vi.module';
import { GioiHanDonViModule } from '../gioi-han-don-vi/gioi-han-don-vi.module';
import { VungMienModule } from '../vung-mien/vung-mien.module';
import { GioiHanVungMienModule } from '../gioi-han-vung-mien/gioi-han-vung-mien.module';
import { PhanHoiModule } from '../phan-hoi/phan-hoi.module';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';
import { CauHoiModule } from '../cau-hoi/cau-hoi.module';
import { DapAnModule } from '../dap-an/dap-an.module';
import { ChiTietPhanHoiModule } from '../chi-tiet-phan-hoi/chi-tiet-phan-hoi.module';

@Module({
  imports: [
    DonViModule,
    GioiHanDonViModule,
    VungMienModule,
    GioiHanVungMienModule,
    PhanHoiModule,
    NguoiDungModule,
    CauHoiModule,
    DapAnModule,
    ChiTietPhanHoiModule,
  ],
  controllers: [ThongKeController],
  providers: [ThongKeService],
  exports: [ThongKeService],
})
export class ThongKeModule {}
