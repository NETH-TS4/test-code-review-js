import React from 'react';

export default function ArticleList({ items }) {
  if (!items.length) return <p>No articles yet.</p>;
  return (
    <ul>
      {items.map((a) => (
        <li key={a.id}>
          <strong>{a.title}</strong> — {a.content} (⭐{a.rating})

          // Export for testing
          <a
            style={{ marginLeft: 8 }}
            href={`http://localhost:4000/api/md/${a.id}.md`}
          >
            export
          </a>
        </li>
      ))}
    </ul>
  );
}
