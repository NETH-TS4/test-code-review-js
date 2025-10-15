import React from 'react';

export default function TagCloud({ tags, onSelect, selected }) {
  if (!tags.length) return null;
  return (
    <div style={{ marginBottom: 16 }}>
      {tags.map((t) => (
        <button
          key={t.tagName}
          style={{
            marginRight: 8,
            background: selected === t.tagName ? '#ddd' : '#eee',
          }}
          onClick={() => onSelect(t.tagName)}
        >
          {t.tagName} ({t.count})
        </button>
      ))}
    </div>
  );
}