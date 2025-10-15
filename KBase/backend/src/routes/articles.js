import { Router } from 'express';
import svc from '../services/articlesSvc.js';

const router = Router();

router.get('/', (_req, res) => res.json(svc.list()));

router.post('/', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).send('Missing fields');
  const created = svc.create({ title, content });
  res.status(201).json(created);
});

router.post('/:id/rate', (req, res) => {
  const article = svc.rate(req.params.id, req.body.delta ?? 1);
  if (!article) return res.sendStatus(404);
  res.json(article);
});

export default router;