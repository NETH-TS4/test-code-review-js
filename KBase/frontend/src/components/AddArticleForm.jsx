import React from 'react';
import { useState } from 'react';

export default function AddArticleForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!title || !content) return;
    const tagArr = tags.split(',').map((s) => s.trim());
    onAdd(title, content, tagArr).then(() => {
      setTitle('');
      setContent('');
      setTags('');
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
      <input
        placeholder="tags (a,b,c)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}