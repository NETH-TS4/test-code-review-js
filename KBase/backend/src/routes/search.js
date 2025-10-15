import { Router } from 'express';
import { querySearch } from '../services/searchSvc.js';

const router = Router();

const DEBUG = process.env.NODE_ENV === 'debug';

router.get('/', (req, res) => {
  const { q, thresh } = req.query;
  if (!q) return res.status(400).send('missing query');
  if (DEBUG) console.log('searching', q);

  const results = querySearch(q, Number(thresh));
  res.json(results);
})

export default router;