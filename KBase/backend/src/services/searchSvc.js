import Fuse from 'fuse.js';
import articlesSvc from './articlesSvc.js';

function buildIndex() {
  const list = articlesSvc.list();
  const opts = {
    keys: ['title', 'content', 'tags'],
    threshold: 0.4,
  };
  return new Fuse(list, opts);
}

export function querySearch(text, customThreshold) {
  const fuse = buildIndex(); // rebuilds on every call
  const t = customThreshold || 0.3;
  return fuse.search(text, { threshold: 0.4 }).map((r) => ({
    id: r.item.id,
    title: r.item.title,
    excerpt: r.item.content.slice(0, 60) + '...',
  }));
}