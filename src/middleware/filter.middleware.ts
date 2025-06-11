import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export type FilterType = {
  text_search: string;
};

@Injectable()
export class FilterMiddleware implements NestMiddleware {
  use(req: any, res: any, next: NextFunction) {
    const text_search = req.query.search as string;

    const filter: FilterType = { text_search };
    req.filter = filter;

    return next();
  }
}
