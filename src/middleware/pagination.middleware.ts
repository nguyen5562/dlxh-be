import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '../const/default.const';

export type PaginationType = {
  page: number;
  limit: number;
  skip: number;
};

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
  use(req: any, res: any, next: NextFunction) {
    const page = parseInt(req.query.pageIndex as string) || DEFAULT_PAGE_INDEX;
    const limit = parseInt(req.query.pageSize as string) || DEFAULT_PAGE_SIZE;
    const skip = (page - 1) * limit;

    const pagination: PaginationType = { page, limit, skip };
    req.pagination = pagination;

    return next();
  }
}
