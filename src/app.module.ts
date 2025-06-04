import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NguoiDungModule } from './modules/nguoi-dung/nguoi-dung.module';
import { VaiTroModule } from './modules/vai-tro/vai-tro.module';
import { QuyenModule } from './modules/quyen/quyen.module';
import { VaiTroQuyenModule } from './modules/vai-tro-quyen/vai-tro-quyen.module';
import { AuthModule } from './modules/auth/auth.module';
import { databaseConfig } from './configs/env.config';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VungMienModule } from './modules/vung-mien/vung-mien.module';
import { DonViModule } from './modules/don-vi/don-vi.module';
import { KhaoSatModule } from './modules/khao-sat/khao-sat.module';
import { PhanKhaoSatModule } from './modules/phan-khao-sat/phan-khao-sat.module';
import { CauHoiModule } from './modules/cau-hoi/cau-hoi.module';
import { DapAnModule } from './modules/dap-an/dap-an.module';
import { ChiTietPhanHoiModule } from './modules/chi-tiet-phan-hoi/chi-tiet-phan-hoi.module';
import { PhanHoiModule } from './modules/phan-hoi/phan-hoi.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(databaseConfig.uri),
    AuthModule,
    NguoiDungModule,
    VaiTroModule,
    QuyenModule,
    VaiTroQuyenModule,
    VungMienModule,
    DonViModule,
    KhaoSatModule,
    PhanKhaoSatModule,
    CauHoiModule,
    DapAnModule,
    PhanHoiModule,
    ChiTietPhanHoiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
