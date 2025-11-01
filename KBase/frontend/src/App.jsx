import React from 'react';
import useArticles from './hooks/useArticles.js';
import ArticleList from './components/ArticleList.jsx';
import AddArticleForm from './components/AddArticleForm.jsx';
import TagCloud from './components/TagCloud.jsx';

export default function App() {
  const { items, add, tags, selectTag, selected } = useArticles();

  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>KBase</h1>
      <AddArticleForm onAdd={add} />
      <TagCloud tags={tags} onSelect={selectTag} selected={selected} />
      <ArticleList items={items} />
    </main>
  );
}