import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, originalUrl, body } = request;
    const now = Date.now();

    this.logger.log(
      `📥 Request: ${method} ${originalUrl}`,
      'LoggerInterceptor',
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (body && typeof body === 'object' && Object.keys(body).length > 0) {
      this.logger.debug(
        `📝 Body: ${JSON.stringify(body)}`,
        'LoggerInterceptor',
      );
    }

    return next.handle().pipe(
      tap((data) => {
        const duration = Date.now() - now;
        this.logger.log(
          `📤 Response: ${method} ${originalUrl} - ${duration}ms`,
          'LoggerInterceptor',
        );
        this.logger.debug(
          `📦 Data: ${JSON.stringify(data)}`,
          'LoggerInterceptor',
        );
      }),
    );
  }
}
