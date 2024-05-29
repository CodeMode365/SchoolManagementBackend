import { default as AuthRoute } from '@/routes/auth.route';

import { Router } from 'express';

const router = Router();

router.use('/auth', AuthRoute);

export default router;
