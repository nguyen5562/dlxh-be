import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginationType } from '../middleware/pagination.middleware';

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationType => {
    const request = ctx.switchToHttp().getRequest();
    return request.pagination;
  },
);
