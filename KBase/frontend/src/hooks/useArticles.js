import { useEffect, useState, useCallback } from 'react';

const API = 'http://localhost:4000/api/articles';
const TAG_API = 'http://localhost:4000/api/tags';

export default function useArticles() {
  const [items, setItems] = useState([]);
  const [tags, setTags] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchTags = useCallback(() => {
    fetch(TAG_API)
      .then((r) => r.json())
      .then((data) => setTags(data));
  }, []);

  const refresh = useCallback(() => {
    fetch(API)
      .then((r) => r.json())
      .then(setItems);
    fetchTags();
  }, [fetchTags]);

  const add = (title, content, tags) =>
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, tags }),
    }).then(refresh);

  useEffect(refresh, [refresh]);

  const filtered = selected
    ? items.filter((a) => new RegExp(selected, 'i').test(a.tags.join(',')))
    : items;

  return {
    items: filtered,
    add,
    tags,
    selectTag: setSelected,
    selected,
    refresh,
  };
}