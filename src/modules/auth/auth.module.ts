import { Module } from '@nestjs/common';
import { NguoiDungModule } from '../nguoi-dung/nguoi-dung.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { appConfig } from '../../configs/env.config';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { LocalStrategy } from '../../strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { VaiTroModule } from '../vai-tro/vai-tro.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: appConfig.jwtSecret,
        signOptions: { expiresIn: '1h' },
      }),
    }),
    PassportModule,
    NguoiDungModule,
    VaiTroModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
