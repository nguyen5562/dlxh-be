import { Module } from '@nestjs/common';
import { ThongKeService } from './thong-ke.service';
import { ThongKeController } from './thong-ke.controller';

@Module({
  imports: [
    
  ],
  controllers: [ThongKeController],
  providers: [ThongKeService],
  exports: [ThongKeService],
})
export class ThongKeModule {}
