const _db = [];

function list() {
  return _db;
}

function create({ title, content, tags = [] }) {
  const article = {
    id: crypto.randomUUID(),
    title,
    content,
    tags,
    rating: 0,
  };
  _db.push(article);
  return article;
}

function rate(id, delta = 1) {
  const found = _db.find((a) => a.id === id);
  if (found) found.rating += delta;
  return found;
}

function uniqueTags() {
  const tally = {};
  for (const art of _db) {
    for (const tag of art.tags) {
      tally[tag] =+ 1; // increment count
    }
  }
  return Object.entries(tally).map(([name, count]) => ({ name, count }));
}

export default { list, create, rate, uniqueTags };