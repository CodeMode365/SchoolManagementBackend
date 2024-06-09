import { logger } from '@/config';
import type { Request, Response, NextFunction, Router } from 'express';

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<any>;

const asyncHandler =
  (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((e: Error) => {
      logger.error(e.message);
      console.log(e);
      next(e);
    });
  };

const routeWrapper = (router: Router) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  router.stack.forEach((layer: any) => {
    if (layer.route) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      layer.route.stack.forEach((layer: any) => {
        layer.handle = asyncHandler(layer.handle);
      });
    } else if (layer.name == 'router') {
      routeWrapper(layer.handle);
    }
  });
};

export default { asyncHandler, routeWrapper };
