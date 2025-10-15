import React from 'react';
import useArticles from './hooks/useArticles.js';
import ArticleList from './components/ArticleList.jsx';
import AddArticleForm from './components/AddArticleForm.jsx';
import MarkdownImport from './components/MarkdownImport.jsx';

export default function App() {
  const { items, add, refresh } = useArticles();

  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>KBase</h1>
      <MarkdownImport onImported={refresh} />
      <AddArticleForm onAdd={add} />
      <ArticleList items={items} />
    </main>
  );
}