import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NguoiDungModule } from './modules/nguoi-dung/nguoi-dung.module';
import { VaiTroModule } from './modules/vai-tro/vai-tro.module';
import { QuyenModule } from './modules/quyen/quyen.module';
import { VaiTroQuyenModule } from './modules/vai-tro-quyen/vai-tro-quyen.module';
import { AuthModule } from './modules/auth/auth.module';
import { databaseConfig } from './configs/env.config';
import { ConfigModule } from '@nestjs/config';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
