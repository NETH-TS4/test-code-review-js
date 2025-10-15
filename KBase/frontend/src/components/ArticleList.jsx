import React from 'react';

export default function ArticleList({ items }) {
  if (!items.length) return <p>No articles yet.</p>;
  return (
    <ul>
      {items.map((a) => (
        <li key={a.id}>
          <strong>{a.title}</strong> — {a.content} (⭐{a.rating})
        </li>
      ))}
    </ul>
  );
}