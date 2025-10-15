import { useEffect, useState, useCallback } from 'react';

const API = 'http://localhost:4000/api/articles';

export default function useArticles() {
  const [items, setItems] = useState([]);

  const refresh = useCallback(() => {
    fetch(API)
      .then((r) => r.json())
      .then(setItems);
  }, []);

  const add = (title, content) =>
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    }).then(refresh);

  useEffect(refresh, [refresh]);

  function updateRating(id, rating) {
  setItems((prev) =>
    prev.map((a) => (a.id === id ? { ...a, rating } : a))
  );
}

  return { items, add, refresh, updateRating };
}