import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FilterType } from '../middleware/filter.middleware';

export const Filter = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): FilterType => {
    const request = ctx.switchToHttp().getRequest();
    return request.filter;
  },
);
