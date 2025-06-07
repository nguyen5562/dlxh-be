import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NguoiDung, NguoiDungSchema } from './schema/nguoi-dung.schema';
import { NguoiDungService } from './nguoi-dung.service';
import { NguoiDungController } from './nguoi-dung.controller';
import { VaiTroModule } from '../vai-tro/vai-tro.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { appConfig } from '../../configs/env.config';
import { DonViModule } from '../don-vi/don-vi.module';
import { VungMienModule } from '../vung-mien/vung-mien.module';
import { GioiHanDonViModule } from '../gioi-han-don-vi/gioi-han-don-vi.module';
import { GioiHanVungMienModule } from '../gioi-han-vung-mien/gioi-han-vung-mien.module';
import { KhaoSatModule } from '../khao-sat/khao-sat.module';
import { PhanHoiModule } from '../phan-hoi/phan-hoi.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NguoiDung.name, schema: NguoiDungSchema },
    ]),
    forwardRef(() => VaiTroModule),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: appConfig.jwtSecret,
        signOptions: { expiresIn: '1h' },
      }),
    }),
    PassportModule,
    forwardRef(() => DonViModule),
    forwardRef(() => VungMienModule),
    forwardRef(() => GioiHanDonViModule),
    forwardRef(() => GioiHanVungMienModule),
    forwardRef(() => KhaoSatModule),
    forwardRef(() => PhanHoiModule),
  ],
  controllers: [NguoiDungController],
  providers: [NguoiDungService],
  exports: [NguoiDungService],
})
export class NguoiDungModule {}
