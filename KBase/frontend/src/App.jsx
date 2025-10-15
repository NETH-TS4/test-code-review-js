import React from 'react';
import useArticles from './hooks/useArticles.js';
import ArticleList from './components/ArticleList.jsx';
import AddArticleForm from './components/AddArticleForm.jsx';
import useSearch from './hooks/useSearch.js';
import SearchBar from './components/SearchBar.jsx';

export default function App() {
  const { items, add } = useArticles();
  const { results, run } = useSearch();

  const listToShow = results.length ? results : items;

  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>KBase</h1>

      <SearchBar onRun={run} />
      <AddArticleForm onAdd={add} />

      <ArticleList items={listToShow} />
    </main>
  );
}
