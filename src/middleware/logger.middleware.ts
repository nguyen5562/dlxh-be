import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const start = Date.now();

    this.logger.log(
      `Start request: ${method} ${originalUrl}`,
      'Logger Middleware',
    ); // chạy đầu tiên

    res.on('finish', () => {
      const duration = Date.now() - start;
      const status = res.statusCode;
      this.logger.log(
        `End request: ${method} ${originalUrl} ${status} - ${duration}ms`,
        'LoggerMiddleware',
      );
    });

    next();
  }
}
