import express          from 'express';
import controllers from './controllers';

const router = express.Router();

const BASE_URL = 'subscribers';

router.post(`/${BASE_URL}`, controllers.subscribers.create);
router.get(`/${BASE_URL}`, controllers.subscribers.list);
router.get(`/${BASE_URL}/:id`, controllers.subscribers.get);

export default router;
