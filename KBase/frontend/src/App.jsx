import React from 'react';
import useArticles from './hooks/useArticles.js';
import ArticleList from './components/ArticleList.jsx';
import AddArticleForm from './components/AddArticleForm.jsx';
import useRatings from './hooks/useRatings.js';

export default function App() {
  const { items, add, updateRating } = useArticles();
  useRatings(updateRating);

  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>KBase</h1>
      <AddArticleForm onAdd={add} />
      <ArticleList items={items} />
    </main>
  );
}