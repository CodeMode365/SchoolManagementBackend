import { vars } from '@/config';
import { SessionController } from '@/controller';
import { cacheMiddleware } from '@/middleware';
import { Router } from 'express';

const router = Router();
const cacheKey = vars.cacheKey.sessions;
const { getCache, clearCache } = cacheMiddleware;
const { getAll, getById, create, remove } = SessionController;

router.get('/all', getCache(cacheKey), getAll);
router.get('/:sessionId', getCache(cacheKey), getById);
router.post('/create', clearCache(cacheKey), create);
router.delete('/delete/:sessionId', clearCache(cacheKey), remove);

export default router;
