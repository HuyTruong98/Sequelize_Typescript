import { Request, Response, NextFunction } from 'express';

const catchAsync = (fn: () => Promise<any>) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn()).catch((err) => next(err));
};

export default catchAsync;
