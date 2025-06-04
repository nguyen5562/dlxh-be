import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health-check')
  getHello() {
    return 'ok! updated!';
  }

  @Get('/qr')
  async getQr(@Query('url') url: string, @Res() res: Response) {
    const qrImage = await this.appService.generateQr(url);
    // Trả về image/png base64 dưới dạng file ảnh
    const base64Data = qrImage.replace(/^data:image\/png;base64,/, '');
    const imgBuffer = Buffer.from(base64Data, 'base64');
    res.setHeader('Content-Type', 'image/png');
    res.send(imgBuffer);
  }
}
