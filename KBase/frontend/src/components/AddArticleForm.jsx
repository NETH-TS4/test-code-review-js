import React from 'react';
import { useState } from 'react';

export default function AddArticleForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!title || !content) return;
    onAdd(title, content).then(() => {
      setTitle('');
      setContent('');
    });
  }

  return (
    <form onSubmit={submit}>
      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}