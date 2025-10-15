import React from 'react';
import { useState } from 'react';

export default function SearchBar({ onRun }) {
  const [q, setQ] = useState('');

  function submit(e) {
    e.preventDefault();
    onRun(q);
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 16 }}>
      <input
        placeholder="search…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button>Go</button>
    </form>
  );
}