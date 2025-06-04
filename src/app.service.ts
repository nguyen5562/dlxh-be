import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async generateQr(url: string): Promise<string> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const qrCode = await QRCode.toDataURL(url);
      return qrCode;
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw new Error('Không thể tạo mã QR');
    }
  }
}
