import { vars } from '@/config';
import { TokenController } from '@/controller';
import { cacheMiddleware, can } from '@/middleware';
import { Router } from 'express';

const router = Router();
const cacheKey = vars.cacheKey.tokens;
const { getCache, clearCache } = cacheMiddleware;
const { getAll, remove, getById, getByUser } = TokenController;

router.get('/all', getCache(cacheKey), getAll);
router.get('/:tokenId', getCache(cacheKey), getById);
router.get('/by-user/:userId', getCache(cacheKey), getByUser);
router.delete('/remove/:tokenId', clearCache(cacheKey), remove);

export default router;
