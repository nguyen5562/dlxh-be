import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NguoiDung, NguoiDungSchema } from './schema/nguoi-dung.schema';
import { NguoiDungService } from './nguoi-dung.service';
import { NguoiDungController } from './nguoi-dung.controller';
import { VaiTroModule } from '../vai-tro/vai-tro.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { appConfig } from '../../configs/env.config';

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
  ],
  controllers: [NguoiDungController],
  providers: [NguoiDungService],
  exports: [NguoiDungService],
})
export class NguoiDungModule {}
