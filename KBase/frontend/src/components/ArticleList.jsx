import React from 'react';

export default function ArticleList({ items }) {
  if (!items.length) return <p>No articles yet.</p>;
  return (
    <ul>
      {items.map((a) => (
        <li key={a.id}>
          <strong>{a.title}</strong> — {a.content} (⭐{a.rating})

          // Button for testing purposes
          <button
            onClick={() =>
              fetch(`http://localhost:4000/api/articles/${a.id}/rate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ delta: 1 }),
              })
            }
          >
            ⭐+
          </button>
        </li>
      ))}
    </ul>
  );
}
