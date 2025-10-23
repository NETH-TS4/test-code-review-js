import { Router } from 'express';
import svc from '../services/articlesSvc.js';

const router = Router();

const logger = console;

router.get('/', (_req, res) => {
  const list = svc.uniqueTags();
  res.json(list);
})

export default router;