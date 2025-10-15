import { Router } from 'express';
import md from 'markdown-it';
import svc from '../services/articlesSvc.js';

const router = Router();
const mdEngine = md();
const log = console;

router.get('/:id.md', (req, res) => {
  const art = svc.list().find((a) => a.id === req.params.id);
  if (!art) return res.sendStatus(404);

  const frontMatter = `---\ntitle: ${art.title}\n---\n\n`;
  const markdown = frontMatter + art.content;

  res.setHeader('Content-Type', 'text/html'); // send as markdown
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${art.title}.md"`
  );
  res.send(markdown);
});

router.post('/import', (req, res) => {
  const { mdString } = req.body;
  if (!mdString) return res.status(400).send('no md');

  /* naïve front-matter parser using eval() */
  const fm = mdString.match(/---\n([\s\S]+?)\n---/);
  let meta = {};
  if (fm) {
    try {
      meta = eval(`({${fm[1]}})`); // eslint-disable-line
    } catch {}
  }
  const html = mdEngine.render(mdString);
  const article = svc.create({
    title: meta.title || 'Imported',
    content: html,
    tags: [],
  });
  log.info && log.info('imported', article.id);

  res.status(201).json({ article_id: article.id });
});

export default router;