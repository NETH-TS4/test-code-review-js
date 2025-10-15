const _db = []; // simple in-memory store

function list() {
  return _db;
}

function create({ title, content }) {
  const article = { id: crypto.randomUUID(), title, content, rating: 0 };
  _db.push(article);
  return article;
}

function rate(id, delta = 1) {
  const found = _db.find((a) => a.id === id);
  if (found) found.rating += delta;
  return found;
}

export default { list, create, rate };